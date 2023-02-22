const buttonDiv = document.getElementById("buttons")
const gallery = document.getElementsByClassName("gallery")[0];
let works = [];
let categories = [];

/**
 * Fetch categories
 */
fetch("http://localhost:5678/api/categories").then(response => response.json()).then(data => {
    createButton("Tous", true, buttonDiv)
    data.forEach(element => {
        createButton(element, false, buttonDiv)
        categories.push(element);
    })
});

/**
 * Fetch works
 */
fetch("http://localhost:5678/api/works").then(response => response.json()).then(data => {
    data.forEach(element => {
        works.push(element);
    })
    checkButton(0)
});

/**
 * Get works for modal
 */
function getWorksModal() {
    const modalGallery = document.getElementById("modalworks-gallery");
    works.forEach(work => {
        const workModal = document.createElement("div");
        workModal.setAttribute("workId", work.id);
        workModal.style.width = "";
        workModal.style.position = "relative";

        const image = document.createElement("img");
        image.setAttribute("src", work.imageUrl);
        image.setAttribute("alt", work.title);
        workModal.appendChild(image);

        const edit = document.createElement("p");
        edit.setAttribute("id", "modal-edit");
        edit.style.cursor = "pointer";
        edit.innerText = "éditer";
        workModal.appendChild(edit);

        const deleteIcon = document.createElement("i");
        deleteIcon.setAttribute("class", "fa-regular fa-trash-can")
        deleteIcon.setAttribute("id", "delete-work-icon")
        deleteIcon.setAttribute("workId", work.id)
        deleteIcon.style.fontSize = "15px";
        deleteIcon.addEventListener("click", function () {
            deleteWork(work.id);
        })
        workModal.appendChild(deleteIcon)
        modalGallery.appendChild(workModal);
    })
}

/**
 * Remove work from modal
 */
function removeWorksModal() {
    const modalGallery = document.getElementById("modalworks-gallery");
    Array.prototype.slice.call(modalGallery.getElementsByTagName("div")).forEach(element => {
        element.remove();
    })
}

/**
 *
 * @param {Number} category - Category id
 */
function checkButton(category) {
    changeCurrentButton(category)
    getWorks(category)
}

/**
 * Create a filter button
 * @param {String} element
 * @param {boolean} active
 * @param {Element} parent
 */
function createButton(element, active, parent) {
    const button = document.createElement("button");
    const name = element === "Tous" ? "Tous" : element.name;
    const categoryId = element === "Tous" ? 0 : element.id;
    button.innerText = name;
    button.setAttribute("class", active ? "active" : "not_active");
    button.setAttribute("categoryId", categoryId);
    button.onclick = function () {
        checkButton(categoryId);
    };
    parent.appendChild(button);
}

/**
 * Create a figure for the gallery
 * @param {String} source - Image source of the figure
 * @param {String} title - Title of the figure
 */
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

/**
 * Change style of the filter buttons
 * @param {Number} categoryId
 */
function changeCurrentButton(categoryId) {
    removeWorks();
    Array.prototype.slice.call(buttonDiv.getElementsByTagName("button")).forEach(button => {
        if (Number(button.getAttribute("categoryId")) === categoryId) {
            button.setAttribute("class", "active")
        } else {
            button.setAttribute("class", "not_active")
        }
    })
}

/**
 * Create figure for each work
 * @param {Number} category - Category id
 */
function getWorks(category) {
    works.forEach(work => {
        if (work.categoryId === category || category === 0) {
            createFigure(work.imageUrl, work.title);
        }
    })
}

/**
 * Remove works from the gallery
 */
function removeWorks() {
    Array.prototype.slice.call(gallery.getElementsByTagName("figure")).forEach(figure => {
        gallery.removeChild(figure);
    })
}

/**
 * Add work from the modal
 */
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

/**
 * Delete work from the modal
 * @param {Number} id - Work id
 */
function deleteWork(id) {
    fetch("http://localhost:5678/api/works/" + id, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }).catch(error => console.log(error));

    for (let i = 0; i < works.length; i++) {
        if (works[i].id === id) {
            works.splice(i, 1);
        }
    }
    removeWorksModal();
    getWorksModal();
    removeWorks();
    getWorks(0);
}