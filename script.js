const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

import * as canvasui from "./canvasui.js"

canvasui.createCanvasButton("test",{x:10,y:10,w:100,y:50},"Hello","red")

function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    canvasui.drawCanvasButtons(ctx);

}

function gameLoop() {
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    draw();
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);