const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

import * as canvasui from "./canvasui.js";

var screen = "startmenu";

//Initialising canvasui elements
canvasui.createCanvasButton(
    "startButton",
    {x: "0.5(w-100)", y: "h-200", w: 100, h:50},
    "Start",
    "grey",
    function(){ screen = "game"; alert(screen) },
    "startmenu"
);

function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    if (screen == "startmenu") {
    }

    canvasui.drawCanvasButtons(ctx,screen);
}

function gameLoop() {
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    draw();
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

canvas.onclick = function(event) {
    canvasui.handleClick(event,screen);
};