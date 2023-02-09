const modal = document.getElementById("modal");

function displayModal() {
    modal.style.display = null;
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-model", "true")
    modal.addEventListener("click", hideModal);
    document.getElementById("container").addEventListener("click", stopPropagation)
}

function hideModal() {
    modal.style.display = "none";
    modal.removeAttribute("aria-model");
    modal.setAttribute("aria-hidden", "true");
    modal.removeEventListener("click", hideModal);
}

function stopPropagation(event) {
    event.stopPropagation();
}

window.addEventListener("keydown", function (event) {
    const key = event.key;
    if(key === "Escape" || key === "Esc")
        hideModal();
});


