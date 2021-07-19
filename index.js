/* snake[] is a global variable that contains elements of snake body*/
let snake = [];

/* stars[] is a global variable that contains star elements*/
let stars = [];

/* headAim is a constant object instance that that holds four different value for Snake move direction:
    - UP(=0): in case of upward snake movement use this. 
    - RIGHT(=1): in case of right snake movement use this. 
    - DOWN(=2): in case of downward snake movement use this. 
    - LEFT(=3): in case of left snake movement use this. 

*/
const headAim = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3,
};

// freezing object to avoid unwanted changes in object values 
Object.freeze(headAim);

/* snakeHeadAim is a global variable to store snake's move direction */
let snakeHeadAim = headAim.RIGHT;

/* scoreCount is a global variable that holds score */
let scoreCount = 0;

/* scoreCount is a global variable that holds number of remaining lives */
let hearts = 3;

/* step is a constant global variable that define size of step in each move */
const step = 10;

/* These are constant global variables that holds alt code of star and heart character */
const starAltCode = "&#10022;";
const heartAltCode = "&#10084;";

/* getSnakeHead: Object
    This functions gets last element of snake[] that contains element with class '.head' that represents head of the snake and
    parses it style.left and style.top that represents x-coordination and y-coordination respectively and returns an object that holds
    coordinations and HTMLElement.
*/
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

/* move: void
    This functions makes whole snake move one step due to snakeHeadAim:var
*/
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

/* turnHead: void
    -aim: headAim.value{ UP(=0), RIGHT(=1), DOWN(=2), LEFT(=3) }
    This functions rotates head element of snake and changes the snakeHeadAim:var due to aim:var
*/
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

/* moveBody: void
    -headLastY: last y-coordination of snake head element
    -headLastX: last x-coordination of snake head element
    This functions shifts all elements position to right except last element which is head element of snake 
*/
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
/* moveHead: void
    This functions makes just snake head move one step due to snakeHeadAim:var
*/
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

/* moveByArrows: void
    -event: an event in browser window
    This functions give an key press event and make snake move due to pressed arrow key on keyboard 
*/
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

/* hits: void
    -newX: new x-coordination of snake head element
    -newY: new y-coordination of snake head element
    This functions checks if snake head position changes to newX:var and newY:var will be hit any object or not.
    due to that objects performs increasing score or decreasing lives. it will alert in case of loosing lives 
    and alerts then refreshes the page when the hearts:var become 0.  
*/
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

/* hitsWall: boolean
    -newX: new x-coordination of snake head element
    -newY: new y-coordination of snake head element
    This functions checks if snake head position changes to newX:var and newY:var will be hit the around walls or not.
    it returns true when snake head hits the wall, and false in others.
*/
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

/* hitsBody: boolean
    -newX: new x-coordination of snake head element
    -newY: new y-coordination of snake head element
    This functions checks if snake head position changes to newX:var and newY:var will be hit the snake body or not.
    it returns true when snake head hits it's body, and false in others.
*/
function hitsBody(newX, newY) {
    for (const element of snake) {
        if (element.classList.contains("head")) continue;
        if (element.style.left === `${newX}px` && element.style.top === `${newY}px`)
            return true;
    }
    return false;
}

/* hitsStar: HTMLElement
    -newX: new x-coordination of snake head element
    -newY: new y-coordination of snake head element
    This functions checks if snake head position changes to newX:var and newY:var will be hit any star or not.
    it returns star element when snake head hits the star, and null in others.
*/
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

/* removeStar: void
    -element: the element that will be removed from stars[]
    This functions removes element:var from stars[].
*/
function removeStar(element) {
    element.parentNode.removeChild(element);
    stars.splice(stars.indexOf(element), 1);
}

/* looseHeart: void
    This functions used for decrease number of lives and remove one heart from play-scene due to hearts:var
*/
function looseHeart() {
    hearts--;
    let heartsBox = document.getElementsByClassName("hearts")[0];
    heartsBox.removeChild(heartsBox.lastElementChild);
    if (hearts === 0) return false;
    return true;
}

/* putSnake: void
    -x: x-coordination of snake tail element
    -y: y-coordination of snake tail element
    This functions puts snake in x:var, y:var coordinations.  
*/
function putSnake(x, y) {
    for (let i = 0; i < snake.length; i++) {
        let snakeElement = snake[i];
        snakeElement.style.left = `${x + i * 10}px`;
        snakeElement.style.top = `${y}px`;
    }
}

/* increaseScore: void
    This functions increases the score and changes it's element and will be called in case of hitting a star
*/
function increaseScore() {
    scoreCount++;
    document.getElementById("score-count").innerHTML = `${scoreCount}`;
}

/* increaseSnake: void
    This functions increases the snake body and will be called in case of hitting a star
*/
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

/* makeStar: void
    This functions makes a star in random place and add it to stars[].
*/
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

/* initialHearts: void
    This functions used for initializing of heart elements and add them in play-scene
*/
function initialHearts() {
    let heartsBox = document.getElementsByClassName("hearts")[0];
    for (let i = 0; i < hearts; i++) {
        let heart = document.createElement("span");
        heart.innerHTML = heartAltCode;
        heartsBox.appendChild(heart);
    }
}

/* makeSnake: void
    -length: length of snake
    -initX: initial x-coordination of snake tail  element
    -initY: initial y-coordination of snake tail element
    This functions makes a snake with length of length:var and it's tale will be in initX and initY 
*/
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

/* initialGame: void
    This functions initializes the game: disappearing title and play button, adding action listener for keyboard arrows 
*/
function initialGame() {
    makeSnake(2, 20, 20);
    document.addEventListener("keydown", moveByArrows);
    run();
    initialHearts();
    document.getElementById("play-btn").style.display = "none";
    document.getElementsByClassName("play-scene")[0].style.display = "initial";
    document.getElementsByClassName("game-title")[0].style.display = "none";
}

/* run: void
    This is the main function that calls itself to make game main loop.
*/
function run() {
    setTimeout(function onTick() {
        move();
        run();
        setTimeout(makeStar, 2000);
    }, 100);
}