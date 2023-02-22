const modalWorks = document.getElementById("modalworks");
const modalAddWorks = document.getElementById("modaladdworks");
const submitWorkContainer = document.getElementById("submit-work-container");
const imageContainer = document.getElementById("modaladdworks-image-container");

function displayModalWorks() {
    modalWorks.style.display = null;
    modalWorks.removeAttribute("aria-hidden");
    modalWorks.setAttribute("aria-model", "true");
    modalWorks.addEventListener("click", hideModalWorks);
    document.getElementById("modalworks-wrapper").addEventListener("click", stopPropagation);
    getWorksModal();
}

function hideModalWorks() {
    modalWorks.style.display = "none";
    modalWorks.removeAttribute("aria-model");
    modalWorks.setAttribute("aria-hidden", "true");
    modalWorks.removeEventListener("click", hideModalWorks);
    removeWorksModal();
}

function displayModalAddWorks() {
    hideModalWorks();
    modalAddWorks.style.display = null;
    modalAddWorks.removeAttribute("aria-hidden");
    modalAddWorks.setAttribute("aria-model", "true");
    modalAddWorks.addEventListener("click", hideModalAddWorks);
    document.getElementById("modaladdworks-wrapper").addEventListener("click", stopPropagation);
    categories.forEach(category => {
        const option = document.createElement("option");
        option.setAttribute("value", category.id);
        option.setAttribute("class", "category-select-class")
        option.innerText = category.name;

        document.getElementById("category-select").appendChild(option);
    })
    submitWorkContainer.insertBefore(createError("Veuillez compléter tous les champs"), document.getElementById("submit-work"))
}

function hideModalAddWorks() {
    modalAddWorks.style.display = "none";
    modalAddWorks.removeAttribute("aria-hidden");
    modalAddWorks.setAttribute("aria-model", "true");
    modalAddWorks.addEventListener("click", hideModalAddWorks);
    document.getElementById("modaladdworks-wrapper").addEventListener("click", stopPropagation);
    document.querySelectorAll(".category-select-class").forEach(element => element.remove());
    document.getElementById("image-title").value = "";
    imageContainer.getElementsByTagName("i")[0].style.display = null;
    imageContainer.getElementsByTagName("div")[0].style.display = null;

    if (document.getElementById("modal-image") !== null)
        document.getElementById("modal-image").remove();

    document.getElementById("input-file").value = "";
    submitWorkContainer.removeChild(document.getElementById("error"));
}

function stopPropagation(event) {
    event.stopPropagation();
}

window.addEventListener("keydown", function (event) {
    const key = event.key;
    if (key === "Escape" || key === "Esc") {
        hideModalWorks();
        hideModalAddWorks();
    }
});

document.getElementById("input-file").addEventListener("change", function (event) {
    imageContainer.getElementsByTagName("i")[0].style.display = "none";
    imageContainer.getElementsByTagName("div")[0].style.display = "none";

    const image = document.createElement("img");
    image.setAttribute("id", "modal-image")
    image.setAttribute("src", URL.createObjectURL(event.target.files[0]));
    image.style.objectFit = "cover";
    image.style.maxHeight = "100%"
    image.style.maxWidth = "80%";

    imageContainer.appendChild(image);
})

document.getElementById("submit-work").addEventListener("click", function () {
    addWork();
})

window.addEventListener("input", function (event) {
    const inputElements = document.querySelectorAll(".input-style");
    const imageElement = inputElements[0];
    const nameElement = inputElements[1]
    const button = document.getElementById("submit-work");
    if (event.target === imageElement || event.target === nameElement) {
        if (imageElement.files.length === 0 || nameElement.value === "") {
            button.disabled = true;
            button.style.backgroundColor = null;
            if (!submitWorkContainer.contains(document.getElementById("error")))
                submitWorkContainer.insertBefore(createError("Veuillez compléter tous les champs"), document.getElementById("submit-work"))
        } else if (imageElement.files.length !== 0 && nameElement.value !== "") {
            button.disabled = false;
            button.style.backgroundColor = "#1D6154";
            submitWorkContainer.removeChild(document.getElementById("error"));
        }
    }
})

function createError(message) {
    const errorLabel = document.createElement("label");
    errorLabel.setAttribute("id", "error")
    errorLabel.style.color = "red";
    errorLabel.style.marginTop = "10px";
    errorLabel.innerText = message;
    return errorLabel;
}