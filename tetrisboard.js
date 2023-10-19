var board = []

//Size of the board in tiles
const boardWidth = 10;
const boardHeight = 20;

const boardColour = "#dddddd"

const colours = [ //These should be Hue values
    -1, //0 (empty)
    185,   //1 (long piece, cyan)
]

function initBoard() {
    board = [];
    for(let i = 0; i < boardHeight; i++) {
        board[i] = [];
        for(let j = 0; j < boardWidth; j++) {
            board[i][j] = 0;
        }
    }
    board[0][1] = 1;
    alert(board)
}

function drawBoard(ctx,tileSize) {
    var xOffset = (ctx.canvas.width-(tileSize*boardWidth))/2
    var yOffset = (ctx.canvas.height-(tileSize*boardHeight))/2


    ctx.fillStyle = boardColour;
    ctx.fillRect(xOffset,yOffset,tileSize*boardWidth,tileSize*boardHeight);

    for(var i = 0; i < board.length; i++) {
        var row = board[i];
        for(var j = 0; j < row.length; j++) {
            if (colours[row[j]] > -1) {
                ctx.fillStyle = `hsv(${colours[row[j]]},100%,100%)`;
                ctx.fillRect(xOffset+(tileSize*j),yOffset+(tileSize*i),tileSize,tileSize);
            } 
        }
    }
}

export { initBoard, drawBoard }