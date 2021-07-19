/* Snake is a global variable that contains coordinates of snake body:(x,y)*/
let snake = [];
let stars = [];
const headAim = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3,
};
Object.freeze(headAim);
let snakeHeadAim = headAim.RIGHT;
let scoreCount = 0;
let hearts = 3;
const step = 10;
const starAltCode = "&#10022;";
const heartAltCode = "&#10084;";

function getSnakeHead() {
    let snakeHead = snake[snake.length - 1];
    let lastYPosition = snakeHead.style.top;
    let lastXPosition = snakeHead.style.left;
    let yPosition = parseInt(lastYPosition.slice(0, lastYPosition.length - 2));
    let xPosition = parseInt(lastXPosition.slice(0, lastXPosition.length - 2));
    return {
        x: xPosition,
        y: yPosition,
        element: snakeHead,
    };
}

function looseHeart() {
    hearts--;
    let heartsBox = document.getElementsByClassName("hearts")[0];
    heartsBox.removeChild(heartsBox.lastElementChild);
    if (hearts === 0) return false;
    return true;
}

function initialHearts() {
    let heartsBox = document.getElementsByClassName("hearts")[0];
    for (let i = 0; i < hearts; i++) {
        let heart = document.createElement("span");
        heart.innerHTML = heartAltCode;
        heartsBox.appendChild(heart);
    }
}

function turnHead(aim) {
    let snakeHead = getSnakeHead();
    let angel;
    switch (aim) {
        case headAim.UP:
            angel = "-90deg";
            snakeHeadAim = headAim.UP;
            break;
        case headAim.RIGHT:
            angel = "360deg";
            snakeHeadAim = headAim.RIGHT;
            break;
        case headAim.DOWN:
            angel = "90deg";
            snakeHeadAim = headAim.DOWN;
            break;
        case headAim.LEFT:
            angel = "180deg";
            snakeHeadAim = headAim.LEFT;
            break;
        default:
            angel = "0deg";
    }
    snakeHead.element.style.transform = `rotate(${angel})`;
}

function moveBody(headLastY, headLastX) {
    for (let i = 0; i < snake.length - 1; i++) {
        const element = snake[i];
        if (i === snake.length - 2) {
            element.style.top = headLastY;
            element.style.left = headLastX;
            continue;
        }
        element.style.top = snake[i + 1].style.top;
        element.style.left = snake[i + 1].style.left;
    }
}

/* Moves snake up */
function goUp() {
    if (snakeHeadAim === headAim.DOWN) {
        return;
    }
    let snakeHead = getSnakeHead();
    snakeHead.element.style.top = `${snakeHead.y - step}px`;
    turnHead(headAim.UP);
    moveBody(`${snakeHead.y}px`, `${snakeHead.x}px`);
    hits(snakeHead.x, snakeHead.y - step);
}

/* Moves snake down */
function goDown() {
    if (snakeHeadAim === headAim.UP) {
        return;
    }
    let snakeHead = getSnakeHead();
    snakeHead.element.style.top = `${snakeHead.y + step}px`;
    turnHead(headAim.DOWN);
    moveBody(`${snakeHead.y}px`, `${snakeHead.x}px`);
    hits(snakeHead.x, snakeHead.y + step);
}

/* Moves snake to right */
function goRight() {
    if (snakeHeadAim === headAim.LEFT) {
        return;
    }
    let snakeHead = getSnakeHead();
    snakeHead.element.style.left = `${snakeHead.x + step}px`;
    turnHead(headAim.RIGHT);
    moveBody(`${snakeHead.y}px`, `${snakeHead.x}px`);
    hits(snakeHead.x + step, snakeHead.y);
}

/* Moves snake  to left */
function goLeft() {
    if (snakeHeadAim === headAim.RIGHT) {
        return;
    }
    let snakeHead = getSnakeHead();
    snakeHead.element.style.left = `${snakeHead.x - step}px`;
    turnHead(headAim.LEFT);
    moveBody(`${snakeHead.y}px`, `${snakeHead.x}px`);
    hits(snakeHead.x - step, snakeHead.y);
}

function makeSnake(length, initX, initY) {
    const scene = document.getElementsByClassName("play-scene")[0];

    for (let i = 0; i < length; i++) {
        let snakeElement = document.createElement("span");
        snakeElement.classList.add("snake");
        snakeElement.id = `snake-${i}`;
        if (i === length - 1) {
            snakeElement.classList.add("head");
        } else if (i === 0) {
            snakeElement.classList.add("tail");
        }
        snakeElement.style.left = `${initX + i * 10}px`;
        snakeElement.style.top = `${initY}px`;
        snake.push(snakeElement);
        scene.appendChild(snakeElement);
    }
}

function move() {
    switch (snakeHeadAim) {
        case headAim.UP:
            goUp();
            break;
        case headAim.RIGHT:
            goRight();
            break;

        case headAim.DOWN:
            goDown();
            break;

        case headAim.LEFT:
            goLeft();
            break;
    }
}

function moveHead() {
    let snakeHead = getSnakeHead();
    switch (snakeHeadAim) {
        case headAim.UP:
            snakeHead.element.style.top = `${snakeHead.y - step}px`;
            break;
        case headAim.RIGHT:
            snakeHead.element.style.left = `${snakeHead.x + step}px`;
            break;

        case headAim.DOWN:
            snakeHead.element.style.top = `${snakeHead.y + step}px`;
            break;

        case headAim.LEFT:
            snakeHead.element.style.left = `${snakeHead.x - step}px`;
            break;
    }
}

function moveByArrows(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    const keyPressed = event.keyCode;

    switch (keyPressed) {
        case UP_KEY:
            goUp();
            break;
        case RIGHT_KEY:
            goRight();
            break;
        case DOWN_KEY:
            goDown();
            break;
        case LEFT_KEY:
            goLeft();
            break;
    }
}

function getBodyPosition() {
    let bodyPos = [];
    snake.forEach((element) => {
        bodyPos.push({
            x: element.style.left,
            y: element.style.top,
        });
    });
    return bodyPos;
}

function hitsWall(newX, newY) {
    if (
        newY < 0 ||
        newY + 10 > document.getElementsByClassName("play-scene")[0].clientHeight
    )
        return true;
    if (
        newX < 0 ||
        newX + 10 > document.getElementsByClassName("play-scene")[0].clientWidth
    )
        return true;
    return false;
}

function hitsBody(newX, newY) {
    for (const element of snake) {
        if (element.classList.contains("head")) continue;
        if (element.style.left === `${newX}px` && element.style.top === `${newY}px`)
            return true;
    }
    return false;
}

function hits(newX, newY) {
    let starElement = hitsStar(newX, newY);
    if (starElement != null) {
        //debugger;
        increaseScore();
        increaseSnake();
        removeStar(starElement);
        return;
    }

    if (hitsWall(newX, newY) || hitsBody(newX, newY)) {
        if (looseHeart()) {
            turnHead(headAim.RIGHT);
            putSnake(10, 10);
            alert("You lost a heart!");
        } else {
            alert("You are a loooser!");
            location.reload();
        }
    }
}

function increaseSnake() {
    let head = getSnakeHead();
    let addedSnakeBody = document.createElement("span");
    addedSnakeBody.classList.add("snake");
    addedSnakeBody.style.left = `${head.x}px`;
    addedSnakeBody.style.top = `${head.y}px`;
    snake.splice(snake.length - 1, 0, addedSnakeBody);
    let scene = head.element.parentNode;
    let headElement = scene.removeChild(head.element);
    scene.appendChild(addedSnakeBody);
    scene.appendChild(headElement);
    moveHead();
}

function makeStar() {
    if (document.getElementsByClassName("star").length > 0) return;
    let elementHeight =
        document.getElementsByClassName("play-scene")[0].clientHeight;
    let elementWidth =
        document.getElementsByClassName("play-scene")[0].clientWidth;
    let starY = Math.random() * (elementHeight - 40);
    let starX = Math.random() * (elementWidth - 30);
    starY = 20 + starY - (starY % 10);
    starX = 20 + starX - (starX % 10);

    const scene = document.getElementsByClassName("play-scene")[0];

    let starElement = document.createElement("span");
    starElement.innerHTML = starAltCode;
    starElement.classList.add("star");
    starElement.style.left = `${starX}px`;
    starElement.style.top = `${starY}px`;
    stars.push(starElement);
    scene.appendChild(starElement);
}

function initialGame() {
    makeSnake(2, 20, 20);
    document.addEventListener("keydown", moveByArrows);
    run();
    initialHearts();
    document.getElementById("play-btn").style.display = "none";
    document.getElementsByClassName("play-scene")[0].style.display = "initial";
    document.getElementsByClassName("game-title")[0].style.display = "none";
}

function putSnake(x, y) {
    for (let i = 0; i < snake.length; i++) {
        let snakeElement = snake[i];
        snakeElement.style.left = `${x + i * 10}px`;
        snakeElement.style.top = `${y}px`;
    }
}

function increaseScore() {
    scoreCount++;
    document.getElementById("score-count").innerHTML = `${scoreCount}`;
}

function removeStar(element) {
    element.parentNode.removeChild(element);
    stars.splice(stars.indexOf(element), 1);
}

function hitsStar(newX, newY) {
    for (let element of stars) {
        let starCornerX = parseInt(
            element.style.left.slice(0, element.style.left.length - 2)
        );
        let starCornerY = parseInt(
            element.style.top.slice(0, element.style.top.length - 2)
        );
        let starCenterX = element.clientWidth / 2 + starCornerX;
        let starCenterY = element.clientHeight / 2 + starCornerY;

        if (
            Math.abs(starCenterX - newX) < element.clientWidth / 2 &&
            Math.abs(starCenterY - newY) < element.clientHeight / 2
        ) {
            return element;
        }
    }
    return null;
}

function run() {
    setTimeout(function onTick() {
        move();
        run();
        setTimeout(makeStar, 2000);
    }, 100);
}