let input;

const setup = () => {
    input = document.getElementById("woord");
    document.getElementById("submit").addEventListener("click", trigrams)
}

const trigrams = () => {
    let output = "";
    let i = 0;

    while(i < input.value.length && input.value.substring(i, i+3).length > 2) {
        output += input.value.substring(i, i + 3);
        if (i !== input.value.length - 3) {
            output += ' - ';
        }
        i++;
    }
    console.log(output);
}

window.addEventListener("load", setup);