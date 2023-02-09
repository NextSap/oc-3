window.addEventListener("load", function () {
    if (window.location.href.split("/")[6] === "projets.html") {
        if (localStorage.getItem("token") !== null)
            loggedin();
    }
})

function loggedin() {
    const body = document.getElementsByTagName("body")[0];

    const aside = document.createElement("aside");
    aside.setAttribute("id", "admin-parent-aside");

    const div_container = document.createElement("div");
    div_container.setAttribute("id", "admin-div-container");

    const icon = document.createElement("i");
    icon.setAttribute("class", "fa-regular fa-pen-to-square");
    icon.setAttribute("id", "admin-i");

    const p = document.createElement("p");
    p.setAttribute("id", "admin-p");
    p.innerText = "Mode édition";

    const button = document.createElement("button");
    button.setAttribute("id", "admin-button-submit")
    button.innerText = "publier les changements";

    div_container.appendChild(icon);
    div_container.appendChild(p);
    div_container.appendChild(button);

    aside.appendChild(div_container);

    body.insertBefore(aside, document.getElementById("project-header"));

    document.getElementById("buttons").style.display = "none";

    // bouton modifier

    document.querySelectorAll(".admin-modifier").forEach(element => {

        const div_modifier = document.createElement("div");
        div_modifier.setAttribute("class", "admin-div-modifier");
        div_modifier.onclick = function () {
            displayModalWorks();
        }

        const icon_modifier = document.createElement("i");
        icon_modifier.setAttribute("class", "fa-regular fa-pen-to-square");
        icon_modifier.setAttribute("id", "admin-i-modifier");
        div_modifier.appendChild(icon_modifier);

        const h3_modifier = document.createElement("h3");
        h3_modifier.setAttribute("id", "admin-h3-modifier");
        h3_modifier.innerText = "modifier"
        div_modifier.appendChild(h3_modifier);

        element.appendChild(div_modifier);
    })

    loginButton("OFF");
}

function logout() {
    document.getElementById("admin-parent-aside").remove();
    document.querySelectorAll(".admin-div-modifier").forEach(element => element.remove());
    document.getElementById("buttons").style.display = null;
    localStorage.removeItem("token");
    loginButton("ON");
}

function loginButton(status) {
    const li = document.getElementById("project-li-login");
    if (status === "ON") {
        li.innerText = "login";
        li.style.color = "black";
        li.style.fontWeight = "normal";
        li.onclick = function () {
            changePage("login")
        }
        li.onmouseover = function () {
            li.style.color = "#B1663C";
        }
        li.onmouseout = function () {
            li.style.color = "black";
        }
    }
    if (status === "OFF") {
        li.innerText = "logout";
        li.style.fontWeight = "900";
        li.onclick = function () {
            logout();
        }
        li.onmouseover = function () {
            li.style.color = "#3C3C3C";
        }
        li.onmouseout = function () {
            li.style.color = "black";
        }
    }
}