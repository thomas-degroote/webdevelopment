let global = {
    // ── Globale constanten ─────────────────────────
    AANTAL_KAARTEN: 6, // standaard 6 paren
    AANTAL_GELIJKE_KAARTEN: 2, // standaard 2 kaarten gelijk te stellen
    AFBEELDINGEN: [ // lijst met paden naar de afbeeldingen
        'images/kaart1.png',
        'images/kaart2.png',
        'images/kaart3.png',
        'images/kaart4.png',
        'images/kaart5.png',
        'images/kaart6.png',
        'images/kaart7.png',
        'images/kaart8.png',
        'images/kaart9.png',
        'images/kaart10.png',
    ],
    GELUID_GOED: new Audio('sounds/sound_good.mp3'), // geluid bij juist antwoord
    GELUID_FOUT: new Audio('sounds/sound_bad.mp3'), // geluid bij fout antwoord
};

let omgedraaid = []; // lijst van kaarten die momenteel omgedraaid zijn
let isBezig = false; // true als spel even wacht
let gevonden = 0; // aantal gevonden paren/trio

// ── Setup speelveld ────────────────────────────
const setup = () => {
    gevonden = 0; // standaard gevonden bij start van spel = 0

    // beide radiobuttons overlopen om te weten of het duo's of trio's zijn die gezocht worden
    const radios = document.getElementsByName("aantal_kaarten");
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            global.AANTAL_GELIJKE_KAARTEN = parseInt(radios[i].value);
        }
    }

    // Lees de slider uit om te weten hoeveel combinaties
    global.AANTAL_KAARTEN = parseInt(document.getElementById("kaarten-slider").value);

    // toon sliderwaarde naast de slider
    document.getElementById("kaarten-waarde").textContent = global.AANTAL_KAARTEN;

    const totaal = global.AANTAL_KAARTEN * global.AANTAL_GELIJKE_KAARTEN; // totaal aantal kaarten in spel
    const kolommen = berekenKolommen(totaal); // bereken beste aantal kolommen
    const speelveld = document.getElementById("speelveld"); // speelveld ophalen
    speelveld.innerHTML = ""; // alle oude kaarten verwijderen
    speelveld.style.gridTemplateColumns = "repeat(" + kolommen + ", 110px)"; // grid instellen

    let kaarten = []; // verzameling van alle kaarten
    for (let i = 0; i < global.AANTAL_KAARTEN; i++) { 
        for (let j = 0; j < global.AANTAL_GELIJKE_KAARTEN; j++) { 
            kaarten.push(i); // kaartnummer in verzameling steken
        }
    }

    kaarten = shuffle(kaarten); // kaarten shufflen om op random plaats te zetten

    for (let i = 0; i < kaarten.length; i++) {
        speelveld.appendChild(maakKaart(kaarten[i])); // maak een kaart en voeg toe aan speelveld
    }

    document.getElementById("bericht").textContent = ""; // verwijder winnaarsbericht
};

// shuffle methode om array willekeurig te sorteren
const shuffle = (array) => array.sort(() => Math.random() - 0.5);

// methode om beste kolom te berekenen
const berekenKolommen = (totaal) => {
    const verhouding = window.innerWidth / window.innerHeight; // verhouding scherm (breedte/hoogte)
    let besteKolommen = totaal; // beginwaarde: alles op één rij
    let kleinsteVerschil = Infinity; // beginwaarde: oneindig groot verschil

    for (let kolommen = 1; kolommen <= totaal; kolommen++) { 
        if (totaal % kolommen !== 0) continue; // als er overblijvers zijn --> overslaan
        const rijen = totaal / kolommen;
        const gridVerhouding = kolommen / rijen;
        const verschil = Math.abs(gridVerhouding - verhouding);

        if (verschil < kleinsteVerschil) {
            kleinsteVerschil = verschil;
            besteKolommen = kolommen;
        }
    }

    return besteKolommen;
};

// kaarten aanmaken
const maakKaart = (index) => {
    const kaart = document.createElement("div");
    kaart.className = "kaart";

    const img = document.createElement("img");
    img.src = global.AFBEELDINGEN[index];
    img.className = "voorkant";

    kaart.appendChild(img);
    kaart.addEventListener("click", () => klikKaart(kaart, index));

    return kaart;
};

// Wanneer op de kaart geklikt wordt
const klikKaart = (kaart, index) => {
    if (isBezig) return;
    if (kaart.classList.contains("omgedraaid")) return;
    if (kaart.classList.contains("gevonden")) return;

    kaart.classList.add("omgedraaid");
    omgedraaid.push({ kaart: kaart, index: index });

    if (omgedraaid.length === global.AANTAL_GELIJKE_KAARTEN) {
        controleerMatch();
    }
};

// controleren als er een match is
const controleerMatch = () => {
    isBezig = true;
    document.body.classList.add("bezet");

    const eersteIndex = omgedraaid[0].index;
    let gelijk = true;

    for (let i = 1; i < omgedraaid.length; i++) {
        if (omgedraaid[i].index !== eersteIndex) {
            gelijk = false;
        }
    }

    if (gelijk) {
        for (let i = 0; i < omgedraaid.length; i++) {
            omgedraaid[i].kaart.classList.add("goed");
        }
        global.GELUID_GOED.currentTime = 0;
        global.GELUID_GOED.play();

        setTimeout(() => {
            for (let i = 0; i < omgedraaid.length; i++) {
                omgedraaid[i].kaart.classList.add("gevonden");
            }
            gevonden++;
            resetBeurt();

            if (gevonden === global.AANTAL_KAARTEN) {
                document.getElementById("bericht").textContent = "Gefeliciteerd! Je hebt gewonnen!";
            }
        }, 500);
    } else {
        for (let i = 0; i < omgedraaid.length; i++) {
            omgedraaid[i].kaart.classList.add("fout");
        }
        global.GELUID_FOUT.currentTime = 0;
        global.GELUID_FOUT.play();

        setTimeout(() => {
            for (let i = 0; i < omgedraaid.length; i++) {
                omgedraaid[i].kaart.classList.remove("omgedraaid");
                omgedraaid[i].kaart.classList.remove("fout");
            }
            resetBeurt();
        }, 1000);
    }
};

// beurt resetten
const resetBeurt = () => {
    omgedraaid = [];
    isBezig = false;
    document.body.classList.remove("bezet");
};

// ── Radiobuttons starten setup direct ──────────
const radios = document.getElementsByName("aantal_kaarten");
for (let i = 0; i < radios.length; i++) {
    radios[i].addEventListener("change", setup);
}

// ── Slider past aantal kaarten live aan ────────
document.getElementById("kaarten-slider").addEventListener("input", setup);

// spel starten
document.getElementById("nieuw_game_btn").addEventListener("click", setup);
window.addEventListener("load", setup);