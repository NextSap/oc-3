const buttonDiv = document.getElementById("buttons")

let categories = [];

fetch("http://localhost:5678/api/categories").then(response => response.json()).then(data => {
    createButton("Tous", true, buttonDiv)
    data.forEach(element => {
        createButton(element.name, false, buttonDiv)
        categories.push(element);
    })
});


const gallery = document.getElementsByClassName("gallery")[0];

let works = [];

fetch("http://localhost:5678/api/works").then(response => response.json()).then(data => {
    data.forEach(element => {
        works.push(element);
    })
    checkButton("Tous")
});

function getWorksModal() {
    const modalGallery = document.getElementById("modalworks-gallery");
    works.forEach(work => {
        const workModal = document.createElement("div");
        workModal.setAttribute("workId", work.id);

        const image = document.createElement("img");
        image.setAttribute("src", work.imageUrl);
        image.setAttribute("alt", work.title);
        workModal.appendChild(image);

        const edit = document.createElement("p");
        edit.setAttribute("id", "modal-edit");
        edit.style.cursor = "pointer";
        edit.innerText = "éditer";
        workModal.appendChild(edit);

        modalGallery.appendChild(workModal);
    })
}

function removeWorksModal() {
    const modalGallery = document.getElementById("modalworks-gallery");
    Array.prototype.slice.call(modalGallery.getElementsByTagName("div")).forEach(element => {
        element.remove();
    })
}

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

function addWork() {
    const form = document.getElementById("modaladdworks-form");

    const formData = new FormData();
    formData.append("title", document.getElementById("image-title").value);
    formData.append("image", document.getElementById("input-file").files[0]);
    formData.append("category", document.getElementById("category-select").value);

    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: formData
    }).then(response => {
        if (document.body.contains(document.getElementById("modal-error")))
            form.removeChild(document.getElementById("modal-error"));

        if (!response.ok) {
            const errorLabel = document.createElement("label");
            errorLabel.setAttribute("id", "modal-error")
            errorLabel.style.color = "red";
            errorLabel.style.marginTop = "10px";

            switch (response.status) {
                case 400:
                    errorLabel.innerText = "Bad request (400)";
                    break;
                case 401:
                    errorLabel.innerText = "Unauhorized (401)";
                    break;
                case 404:
                    errorLabel.innerText = "Unexcpected Error (500)";
                    break;
            }

            form.appendChild(errorLabel);
            return;
        }

        response.json().then(data => {
            works.push(data);
            createFigure(data.imageUrl, data.title);
            hideModalAddWorks();
        })
    });
}