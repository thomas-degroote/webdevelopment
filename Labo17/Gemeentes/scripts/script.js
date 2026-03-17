const setup = () => {
    let gestopt = false;
    let gemeenten = [];

    while (!gestopt) {
        let gemeente = prompt("Geef eens gemeente in");

        if (gemeente === null || gemeente === "") {
            gestopt = true;
        } else {
            gemeenten.push(gemeente);
        }
    }
}

window.addEventListener("load", setup);