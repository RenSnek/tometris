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
    function(){ screen = "game"; },
    "startmenu"
);

function draw() {

    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

    if (screen == "startmenu") {
    }

    canvasui.drawCanvasButtons(ctx,canvas,screen);
}

function gameLoop() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

canvas.onclick = function(event) {
    canvasui.handleClick(event,screen);
};