alert("Dit is een alert popup!");

let confirmResult = confirm("Klik op OK of Cancel");

console.log("Return value van confirm:", confirmResult);

if (confirmResult === true) {
    console.log("De gebruiker klikte op OK");
} else {
    console.log("De gebruiker klikte op Cancel");
}

let promptResult = prompt("Typ hier iets en klik op OK of Cancel:");

console.log("Return value van prompt:", promptResult);

if (promptResult === null) {
    console.log("De gebruiker klikte op Cancel");
} else {
    console.log("De gebruiker typte:", promptResult);
}
