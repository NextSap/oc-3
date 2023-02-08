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
        }

        response.json().then(data => {
            localStorage.setItem("token", data.value)
            changePage("projets");
        })
    });
}

window.addEventListener("load", function () {
    const token = localStorage.getItem("token");
    if (isValidToken(token)) {
        changePage("projets");
        loggedin();
    } else {
        localStorage.removeItem("token");
        changePage("login");
    }
})

function loggedin() {
    const header = document.getElementById("project-header");

    const div = document.createElement("div");
    div.setAttribute("id", "admin-div");


    const icon = document.createElement("i");
    icon.setAttribute("className", "fa-solid fa-pen-to-square");
    icon.setAttribute("id", "admin-i");

    const h1 = document.createElement("h1");
    h1.setAttribute("id", "admin-h1");

    const button = document.createElement("button");
    button.setAttribute("id", "admin-button-submit")

    div.appendChild(icon).appendChild(h1).appendChild(button);

    header.insertBefore(div, header.getElementsByTagName("h1")[0]);
}

function logout() {

}

function isValidToken(token) {
    fetch("http://localhost:5678/api/works", {
        method: 'POST',
        body: JSON.stringify({
            test: "TEST"
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }).then(response => {
        if (response.status === 401)
            return false;
        return true;
    })
}