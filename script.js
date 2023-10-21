window.onerror = function(msg, url, linenumber) {
    alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
    return true;
}

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

import * as canvasui from "./canvasui.js";
import * as tetrisboard from "./tetrisboard.js";

var screen = "startmenu";
var tick = 0;

//Helpful consts
const tileSize = 25;

//Initialising canvasui elements
canvasui.createCanvasButton(
    "startButton",
    {x: "0.5(w-100)", y: "(2h)/3", w: 100, h:50},
    "Start",
    "red",
    "#ff5555",
    function(){ startGame(); },
    "startmenu"
);

function startGame() {
    tetrisboard.initBoard();
    screen = "game";
}

function draw() {

    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

    if (screen == "startmenu") {
        
    } else if (screen == "game") {
        tetrisboard.drawBoard(ctx,tileSize);
    }

    canvasui.drawCanvasButtons(ctx,screen);
}

function gameLoop() {
    tick += 1;
    if (screen == "game") {
        if (tick % 10 == 0) {
            tetrisboard.update();
        }
    }
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