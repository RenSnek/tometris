window.onerror = function(msg, url, linenumber) {
    alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
    return true;
}

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

import * as canvasui from "./canvasui.js";
import * as tetrisboard from "./tetrisboard.js";

var screen = "startmenu";

//Helpful consts
const tileSize = 25;
const boardWidth = 10;
const boardHeight = 20;

//Initialising canvasui elements
canvasui.createCanvasButton(
    "startButton",
    {x: "0.5(w-100)", y: "(2h)/3", w: 100, h:50},
    "Start",
    "red",
    "#ff5555",
    function(){ screen = "game"; },
    "startmenu"
);

function draw() {

    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

    if (screen == "startmenu") {
        
    } else if (screen == "game") {
        ctx.fillStyle = "#dddddd";
        ctx.fillRect((ctx.canvas.width-(tileSize*boardWidth))/2,(ctx.canvas.height-(tileSize*boardHeight))/2,tileSize*boardWidth,tileSize*boardHeight);
    }

    canvasui.drawCanvasButtons(ctx,screen);
}

function gameLoop() {

    draw();
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

canvas.onclick = function(event) {
    canvasui.handleClick(ctx,event,screen);
};

canvas.onmousemove = function(event) {
    canvasui.handleMouseMove(ctx,event,screen);
};