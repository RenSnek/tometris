var board = []

//Size of the board in tiles
const boardWidth = 10;
const boardHeight = 20;

const boardColour = "#dddddd"

const colours = [
    boardColour, //0 (empty)
    "#00eeff",   //1 (long piece, cyan)
]

function initBoard(width,height) {
    board = [];
    for(let i = 0; i < h; i++) {
        board[i] = [];
        for(let j = 0; j < w; j++) {
            board[i][j] = 0;
        }
    }
}

function drawBoard(ctx,tileSize) {
    ctx.fillStyle = boardColour;
    ctx.fillRect((ctx.canvas.width-(tileSize*boardWidth))/2,(ctx.canvas.height-(tileSize*boardHeight))/2,tileSize*boardWidth,tileSize*boardHeight);
}

export { initBoard, drawBoard }