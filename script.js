const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

import * as canvasui from "./canvasui"

alert(canvasui.x);

function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.drawRect(0,0,canvas.width,canvas.height)
}

function gameLoop() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);