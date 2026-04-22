let global = {
    IMAGE_COUNT: 5, 
    IMAGE_SIZE: 48, 
    IMAGE_PATH_PREFIX: "images/", 
    IMAGE_PATH_SUFFIX: ".png", 
    MOVE_DELAY: 1000, 
    score: 0, 
    timeoutId: 0, 
    DIV_WIDTH: 700,
    DIV_HEIGHT: 700
};

let img, score;

const setup = () => {
    img = document.getElementById("object");
    score = document.getElementById('score');
    document.getElementById("start").addEventListener("click", startGame);

    img.addEventListener('click', () => {
        if(img.src.includes("0.png")) {
            dead();
        } else {
            global.score++;
            updateScore();
        }
    });
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const startGame = () => {
    moveAndChange();
};

const moveAndChange = () => {
    let random = getRandomInt(0, global.IMAGE_COUNT - 1);
    img.src = global.IMAGE_PATH_PREFIX + random + global.IMAGE_PATH_SUFFIX;

    img.style.left = `${getRandomInt(0, global.DIV_WIDTH - global.IMAGE_SIZE)}px`;
    img.style.top = `${getRandomInt(0, global.DIV_HEIGHT - global.IMAGE_SIZE)}px`;

    global.timeoutId = setTimeout(moveAndChange, global.MOVE_DELAY);
}

const updateScore = () => {
    score.textContent = `Score: ${global.score}`;
}

const dead = () => {
    clearTimeout(global.timeoutId); 
    alert('DOOD');
    global.score = 0;    
    updateScore();
}

window.addEventListener("load", setup);