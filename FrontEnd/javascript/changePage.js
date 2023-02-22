/**
 * Change the route location
 * @param {String} page - Name of the page
 */

function changePage(page) {
    const route = page + ".html";
    if (window.location.href.split("/")[6] !== route) {
        window.location = route;
    }
}