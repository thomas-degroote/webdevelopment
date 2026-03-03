let b1, b2, b3;

const setup = () => {
    let buttons = document.getElementsByTagName("button")

    buttons[0].addEventListener("click", veranderKleur);
    buttons[1].addEventListener("click", veranderKleur);
    buttons[2].addEventListener("click", veranderKleur);
}  

const veranderKleur = (event) => {
    let button = event.target;
    let huidigeKleur = window.getComputedStyle(button).backgroundColor;

    if (huidigeKleur === "rgb(255, 255, 255)") { // wit in rgb
        button.style.backgroundColor = "blue";
    } else {
        button.style.backgroundColor = "white";
    }
}


window.addEventListener("load", setup);