const toonResultaat = () => {
    const roker = document.getElementById("roker").checked;
    const taal = document.querySelector("input[name='taal']:checked").value;
    const buurland = document.getElementById("buurland").value;
    const opties = document.getElementById("bestelling").options;

    let gekozen = [];
    for (let i = 0; i < opties.length; i++) {
        if (opties[i].selected) {
            gekozen.push(opties[i].value);
        }
    }

    let tekst = "";
    tekst += (roker ? "is roker" : "is geen roker") + "<br>";
    tekst += "moedertaal is " + taal + "<br>";
    tekst += "favoriete buurland is " + buurland + "<br>";
    tekst += "bestelling bestaat uit " + gekozen.join(" ") + "<br>";

    document.getElementById("resultaat").innerHTML = tekst;
}

const setup = () => {
    document.getElementById("btnResultaat").addEventListener("click", toonResultaat);
}

window.addEventListener("load", setup);