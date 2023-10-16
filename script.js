const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

import * as canvasui from "./canvasui"

function draw() {

}

function gameLoop() {
    draw();
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);