const form = document.getElementById("login-form");

document.getElementById("login-form").addEventListener("submit", (event) => {
    event.preventDefault();

    login(document.getElementById('email').value, document.getElementById('password').value);
})

function login(email, password) {
    fetch("http://localhost:5678/api/users/login", {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }).then(response => {
        if (document.body.contains(document.getElementById("error")))
            form.removeChild(document.getElementById("error"));

        if (!response.ok) {
            const errorLabel = document.createElement("label");
            errorLabel.setAttribute("id", "error")
            errorLabel.style.color = "red";
            errorLabel.style.marginTop = "10px";

            switch (response.status) {
                case 401:
                    errorLabel.innerText = "Le mot de passe est incorrect";
                    form.insertBefore(errorLabel, document.getElementById("submit-login"));
                    break
                case 404:
                    errorLabel.innerText = "L'adresse e-mail est incorrecte"
                    form.insertBefore(errorLabel, document.getElementById("password-label"));
                    break
            }

            document.getElementById("password").value = "";
            return;
        }

        response.json().then(data => {
            localStorage.setItem("token", data.token)
            changePage("projets");
        })
    });
}