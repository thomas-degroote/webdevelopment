

let container;
let swatches = [];

const setup = () => {
    document.getElementById('submitcommando').addEventListener('click', submitCommando);
    container = document.getElementById("container");
    restoreSwatches();
}

const submitCommando = () => {
    let input = document.getElementById('inputcommando');

    if (input.value.startsWith("/y ")) {
        goToYoutube(input.value.slice(3));
    } else if (input.value.startsWith("/i ")) {
        goToInstagram(input.value.slice(3));
    } else if (input.value.startsWith("/g ")) {
        goToGoogle(input.value.slice(3));
    } else if (input.value.startsWith("/")) {
        alert('Please enter a valid prefix!')
    } else if (input.value === "refresh") {
        window.location.reload();
    } else {
        alert('Please enter a valid commando!');
    }
}

const goToYoutube = (zoekopdracht) => {
    let url = "https://www.youtube.com/results?search_query=" + zoekopdracht;
    window.open(url);
    addSwatch("red","YouTube", zoekopdracht, url);
}

const goToInstagram = (zoekopdracht) => {
    let url = "https://www.instagram.com/explore/tags/" + zoekopdracht;
    window.open(url);
    addSwatch("magenta","Instagram", zoekopdracht, url);
}

const goToGoogle = (zoekopdracht) => {
    let url = "https://www.google.com/search?q=" + zoekopdracht;
    window.open(url);
    addSwatch("blue","Google", zoekopdracht, url);
}

const getRandomColor = () => {
    let colors = ["red", "green", "yellow", "magenta", "cyan"];
    return colors[Math.floor(Math.random() * colors.length)];
}

const addSwatch = (backgroundColor, platform,zoekopdracht, link) => {
    let newDiv = document.createElement("div");
    let title = document.createElement("h2");
    let zoekopdrachtValue = document.createElement("p");
    let goButton = document.createElement("button");

    title.textContent = platform;
    zoekopdrachtValue.textContent = zoekopdracht;

    goButton.style.backgroundColor = getRandomColor();
    goButton.textContent = "Go!"
    goButton.addEventListener("click", () => openWindow(link));

    newDiv.classList.add("swatch");
    newDiv.style.backgroundColor = backgroundColor;

    container.appendChild(newDiv);
    newDiv.appendChild(title);
    newDiv.appendChild(zoekopdrachtValue);
    newDiv.appendChild(goButton);

    let h = {
        title: platform,
        text: zoekopdracht,
        url: link,
        bgColor: backgroundColor ,
    }
    swatches.push(h);
    localStorage.setItem("swatches", JSON.stringify(swatches));
}

const restoreSwatches = () => {
    let hbis = JSON.parse(localStorage.getItem("swatches"));
    for (let i = 0; i < hbis.length; i++) {
        addSwatch(hbis[i].bgColor, hbis[i].title, hbis[i].text, hbis[i].url);
    }
}

const openWindow = (url) => {
  window.open(url);
}

window.addEventListener("load", setup);