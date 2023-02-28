/**
 * Change the route location
 * @param {String} page - Name of the page
 */

function changePage(page) {
    const route = page + ".html";
    if (!window.location.href.includes(route)) {
        if (page === "contact") {
            window.location.replace("projets.html#contact");
        } else
            window.location = route;
    }
}

window.addEventListener("load", () => {
    if (window.location.href.includes("#contact"))
        setTimeout(() => {document.querySelector("#contact").scrollIntoView()}, 100);
})