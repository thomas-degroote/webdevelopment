let namen = ["Thomas","Sander", "Jari", "Thorben", "Hubbe"];

console.log(`Aantal elementen in array: ${namen.length}`);
console.log(namen[0])
console.log(namen[2])
console.log(namen[4])

function VoegNaamToe(array) {
    let nieuweNaam = prompt("Voer een naam in:");
    if (nieuweNaam) {
        array.push(nieuweNaam);
    }
}

VoegNaamToe(namen);
console.log("Array na toevoeging:", namen);