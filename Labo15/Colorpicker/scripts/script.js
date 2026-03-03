let rood, green, blue;

const setup = () => {
    rood = document.getElementById("red");
    green = document.getElementById("green");
    blue = document.getElementById("blue");

    rood.addEventListener("input", update);
    green.addEventListener("input", update);
    blue.addEventListener("input", update);
}

const update = () => {
    let vierkant = document.getElementById("kleurblok");
    vierkant.style.backgroundColor = `rgb(${rood.value}, ${green.value}, ${blue.value})`;
}

window.addEventListener("load", setup);