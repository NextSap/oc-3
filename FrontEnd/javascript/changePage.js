function changePage(page) {
    const route = page + ".html";
    if (window.location.href.split("/")[6] !== route) {
        window.location = route;
    }

   /* Array.prototype.slice.call(document.getElementsByTagName("header")[0].getElementsByTagName("li")).forEach(element => {
            const name = document.getElementsByTagName("title")[0].innerText.split(" - ")[2];
            if (element.innerText === name) {
                element.style.fontWeight = "900";
            }
        }
    ); */
}