window.addEventListener("load", function () {
    if (window.location.href.split("/")[6] === "projets.html") {
        if (localStorage.getItem("token") !== null)
            loggedin();
    }
})

function loggedin() {
    const body = document.getElementsByTagName("body")[0];

    const div = document.createElement("div");
    div.setAttribute("id", "admin-parent-div");

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

    div.appendChild(div_container);

    body.insertBefore(div, document.getElementById("project-header"));

    const li = document.getElementById("project-li-login");
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

function logout() {
    document.getElementById("admin-parent-div").remove();
    localStorage.removeItem("token");
    const li = document.getElementById("project-li-login");
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