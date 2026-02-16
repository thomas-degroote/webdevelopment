const setup = () => {
    let btnWijzig=document.getElementById("wijzigknop");
    btnWijzig.addEventListener("click", aanpassen);
}

const aanpassen = () => {
    let pElement=document.getElementById("txtOutput");
    pElement.innerHTML="Welkom!";
}

window.addEventListener('load',setup);
