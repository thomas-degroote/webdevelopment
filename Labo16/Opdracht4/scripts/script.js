let manvanan, tekst;

const setup = () => {
    manvanan = document.getElementById("manvanan");
    let berekenKnop = document.getElementById("bereken");
    tekst = document.getElementById("aantalkeer");

    berekenKnop.addEventListener("click", getAantalKeer);
}

const getAantalKeer = () => {
    let zin = manvanan.value.toLowerCase(); // lowercase zodat hoofdletters niet uitmaken
    let aantalKeerAn = 0;

    for (let i = 0; i < zin.length - 1; i++) { // -1 omdat we 2 letters tegelijk checken
        if (zin[i] === "a" && zin[i + 1] === "n") {
            aantalKeerAn++;
        }
    }

    tekst.innerHTML = `Aantal keer An: ${aantalKeerAn}`;
}

window.addEventListener("load", setup);