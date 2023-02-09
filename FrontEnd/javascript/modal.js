const modalWorks = document.getElementById("modalworks");
const modalAddWorks = document.getElementById("modaladdworks");
const container = document.getElementById("modaladdworks-image-container");

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
}

function hideModalAddWorks() {
    modalAddWorks.style.display = "none";
    modalAddWorks.removeAttribute("aria-hidden");
    modalAddWorks.setAttribute("aria-model", "true");
    modalAddWorks.addEventListener("click", hideModalAddWorks);
    document.getElementById("modaladdworks-wrapper").addEventListener("click", stopPropagation);
    document.querySelectorAll(".category-select-class").forEach(element => element.remove());
    document.getElementById("image-title").value = "";
    container.getElementsByTagName("i")[0].style.display = null;
    container.getElementsByTagName("div")[0].style.display = null;

    if(document.getElementById("modal-image") !== null)
        document.getElementById("modal-image").remove();
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
    container.getElementsByTagName("i")[0].style.display = "none";
    container.getElementsByTagName("div")[0].style.display = "none";

    const image = document.createElement("img");
    image.setAttribute("id", "modal-image")
    image.setAttribute("src", URL.createObjectURL(event.target.files[0]));
    image.style.objectFit = "cover";
    image.style.height = "100%";

    container.appendChild(image);
})

document.getElementById("submit-work").addEventListener("click", function () {
    addWork();
})