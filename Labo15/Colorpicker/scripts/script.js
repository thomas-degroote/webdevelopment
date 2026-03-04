let rood, green, blue;

const setup = () => {
    rood = document.getElementById("red");
    green = document.getElementById("green");
    blue = document.getElementById("blue");

    rood.addEventListener("change", update);
    green.addEventListener("change", update);
    blue.addEventListener("change", update);
}

const update = () => {
    let vierkant = document.getElementById("kleurblok");
    vierkant.style.backgroundColor = `rgb(${rood.value}, ${green.value}, ${blue.value})`;
}

window.addEventListener("load", setup);