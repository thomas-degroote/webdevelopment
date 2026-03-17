let ingave;

const setup = () => {
    ingave = document.getElementById('de_en_het');
    let verzend = document.getElementById('vervang');

    verzend.addEventListener('click', vervang);
}

const vervang = () => {
    let zin = ingave.value;
    let output = '';

    for (let i = 0; i < zin.length; i++) {
        if (
            zin[i] === 'd' &&
            zin[i + 1] === 'e' &&
            (i === 0 || zin[i - 1] === ' ') &&
            (i + 2 === zin.length || zin[i + 2] === ' ')
        ) {
            output += 'het';
            i++; // skip de 'e'
        } else {
            output += zin[i];
        }
    }

    console.log(output);
}

window.addEventListener("load", setup);