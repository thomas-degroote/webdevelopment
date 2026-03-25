const setup = () => {
    let gestopt = false;
    let gemeenten = [];
    let dropdown = document.getElementById("gemeentenDropdown");


    while (!gestopt) {
        let gemeente = prompt("Geef een gemeente in");

        if (gemeente === null || gemeente === "stop") {
            gestopt = true;
        } else {
            gemeenten.push(gemeente);
        }
    }
    gemeenten.sort();
    for (let i = 0; i < gemeenten.length; i++) {
        let option = document.createElement("option");
        option.text = gemeenten[i];
        option.value = gemeenten[i];
        dropdown.add(option);
    }
    
}

window.addEventListener("load", setup);