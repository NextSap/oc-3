const form = document.getElementById("login-form");

/**
 * Listener who checks email with regex and call the api with credentials
 */
document.getElementById("login-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const emailElement = document.getElementById("email");
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    if (document.body.contains(document.getElementById("error")))
        form.removeChild(document.getElementById("error"));

    if (!emailRegex.test(emailElement.value)) {
        form.insertBefore(createError("Veuillez entrer une adresse email correcte"), document.getElementById("password-label"));
        return;
    }

    login(emailElement.value, document.getElementById('password').value);
})

/**
 * Fetch the token if credentials are correct, display an error if not
 * @param {string} email
 * @param {string} password
 */
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
            if (response.status === 401 || response.status === 404)
                form.insertBefore(createError("Erreur dans l'identifiant ou le mot de passe"), document.getElementById("password").nextElementSibling);

            document.getElementById("password").value = "";
            return;
        }

        response.json().then(data => {
            localStorage.setItem("token", data.token)
            changePage("projets");
        })
    });
}

/**
 * Display an error label to display an error
 * @param {string} message - error message
 */
function createError(message) {
    const errorLabel = document.createElement("label");
    errorLabel.setAttribute("id", "error")
    errorLabel.style.color = "red";
    errorLabel.style.marginTop = "10px";
    errorLabel.innerText = message;
    return errorLabel;
}