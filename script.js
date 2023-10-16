const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

import * as canvasui from "./canvasui.js"

function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.drawRect(0,0,canvas.width,canvas.height)
}

function gameLoop() {
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    draw();
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);