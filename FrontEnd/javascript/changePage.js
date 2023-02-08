function changePage(page) {
    const route = page + ".html";
    if (window.location !== route)
        window.location = route;

    document.addEventListener("load", () => {
        Array.prototype.slice.call(document.getElementsByTagName("header")[0].getElementsByTagName("li")).forEach(element => {
                const name = document.getElementsByTagName("title")[0].innerText.split(" - ")[2];
                if (element.innerText === name) {
                    element.style.color = "red";
                }
            }
        );
    });
}