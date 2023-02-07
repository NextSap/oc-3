const buttonDiv = document.getElementById("buttons")

fetch("http://localhost:5678/api/categories").then(response => response.json()).then(data => {
    createButton("Tous", true, buttonDiv)
    data.forEach(element => {
        createButton(element.name, false, buttonDiv)
    })
});


const gallery = document.getElementsByClassName("gallery")[0];

let works = []

fetch("http://localhost:5678/api/works").then(response => response.json()).then(data => {
    data.forEach(element => {
        works.push(element);
    })
});

function checkButton(category) {
    changeCurrentButton(category)
    getWorks(category)
}

function createButton(name, active, parent) {
    const button = document.createElement("button");
    button.innerText = name;
    button.setAttribute("class", active ? "active" : "not_active");
    button.onclick = function () {
        checkButton(name)
    };
    parent.appendChild(button)
}

function createFigure(source, title) {
    const figure = document.createElement("figure");

    const img = document.createElement("img");
    img.setAttribute("src", source);
    img.setAttribute("alt", title);
    figure.appendChild(img);

    const figcaption = document.createElement("figcaption");
    figcaption.innerText = title;
    figure.appendChild(figcaption);

    gallery.appendChild(figure);
}

function changeCurrentButton(buttonName) {
    removeWorks();
    Array.prototype.slice.call(buttonDiv.getElementsByTagName("button")).forEach(button => {
        if (button.innerText === buttonName) {
            button.setAttribute("class", "active")
        } else
            button.setAttribute("class", "not_active")
    })
}

function getWorks(category) {
    works.forEach(work => {
        if (work.category.name === category || category === "Tous") {
            createFigure(work.imageUrl, work.title);
        }
    })
}

function removeWorks() {
    Array.prototype.slice.call(gallery.getElementsByTagName("figure")).forEach(figure => {
        gallery.removeChild(figure);
    })
}