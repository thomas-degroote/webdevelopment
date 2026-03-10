let input;

const setup = () => {
    knop = document.getElementById("printconsole");
    input = document.getElementById("input");

    knop.addEventListener("click", printMetSpaties);
}

const printMetSpaties = () => {
    let inputZonderSpaties = input.value.replaceAll(" ", "").trim();
    let inputMetSpaties = "";

    for (let i = 0; i < inputZonderSpaties.length; i++) {
        inputMetSpaties += inputZonderSpaties.charAt(i) + " ";
    }
    console.log(inputMetSpaties);
}

window.addEventListener("load", setup);