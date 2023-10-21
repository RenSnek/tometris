var board = []

//Size of the board in tiles
const boardWidth = 10;
const boardHeight = 20;

const blocks = [
    [ //long piece
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0]
    ],
    [ // O piece
        [0,0,0,0],
        [0,2,2,0],
        [0,2,2,0],
        [0,0,0,0] 
    ],
    [ //L piece
        [0,3,3,0],
        [0,3,0,0],
        [0,3,0,0],
        [0,0,0,0]
    ],
    [ // J piece
        [4,4,0,0],
        [0,4,0,0],
        [0,4,0,0],
        [0,0,0,0] 
    ],
    [ // T piece
        [0,5,0,0],
        [5,5,5,0],
        [0,0,0,0],
        [0,0,0,0] 
    ],
    [ // Z piece
        [0,6,0,0],
        [6,6,0,0],
        [6,0,0,0],
        [0,0,0,0] 
    ],
    [ // S piece
        [7,0,0,0],
        [7,7,0,0],
        [0,7,0,0],
        [0,0,0,0] 
    ],
    [ // Test piece
        [0,1,2,3],
        [4,5,6,7],
        [0,1,2,3],
        [4,5,6,7] 
    ],  //https://alex-hhh.github.io/img/a035/all-tetris-blocks.png
]

const boardColour = "#dddddd"

const colours = [ //These should be Hue values
    -1,  //0 ( empty            )
    185, //1 ( I piece , cyan   )
    60,  //2 ( O piece , yellow )
    35,  //3 ( L piece , orange )
    240, //4 ( J piece , blue   )
    275, //5 ( T piece , purple )
    0,   //6 ( Z piece , red    )
    100, //7 ( S piece , green  )
];


var fallingBlockCoords = [ (boardWidth-4)/2 , 0];
var fallingBlockIndex = 8;


function initBoard() {
    board = [];
    for(let i = 0; i < boardHeight; i++) {
        board[i] = [];
        for(let j = 0; j < boardWidth; j++) {
            board[i][j] = 0;
        }
    }
}

function update() {
    var fallingBlockObstructed = false;
    var fallingBlockType = blocks[fallingBlockIndex]
    for(var i = 0; i < fallingBlockType.length; i++) {
        var row = fallingBlockType[i];
        for(var j = 0; j < row.length; j++) {
            if (row[j] > 0) {
                alert(i+","+j+"="+fallingBlockType[i][j]+"="+row[j]);
                var tileAtBottom = ( i + fallingBlockCoords[1] > boardHeight )
                if (!tileAtBottom) {
                    var tileAboveTile = (board[i+fallingBlockCoords[0]][j+fallingBlockCoords[1]+1] > 0)
                } else {
                    var tileAboveTile = false;
                }
                if (tileAtBottom || tileAboveTile) {
                    fallingBlockObstructed = true;
                }
            } 
        }
    }

    if (!fallingBlockObstructed) {
        fallingBlockCoords[1] += 1;
    } else {
        //Add falling block to board, get new falling block
    }
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
                ctx.fillStyle = `hsl(${colours[row[j]]},100%,50%)`;
                ctx.fillRect(xOffset+(tileSize*j),yOffset+(tileSize*i),tileSize,tileSize);
            } 
        }
    }

    var fallingBlockType = blocks[fallingBlockIndex]
    for(var i = 0; i < fallingBlockType.length; i++) {
        var row = fallingBlockType[i];
        for(var j = 0; j < row.length; j++) {
            if (colours[row[j]] > -1) {
                ctx.fillStyle = `hsl(${colours[row[j]]},100%,50%)`;
                ctx.fillRect(xOffset+(tileSize*(j+fallingBlockCoords[0])),yOffset+(tileSize*(i+fallingBlockCoords[1])),tileSize,tileSize);
            } 
        }
    }
}



export { initBoard, drawBoard, update }