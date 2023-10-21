var board = [];

var tileImg = new Image();
tileImg.src = "assets/block.png";

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
];

const boardColour = "#bbbbbb";

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
var fallingBlockIndex = 0;
var fallingBlock = blocks[fallingBlockIndex];

function initBoard() {
    board = [];
    for(let i = 0; i < boardHeight; i++) {
        board[i] = [];
        for(let j = 0; j < boardWidth; j++) {
            board[i][j] = 0;
        }
    }
}

function rotateGridClockwise(matrix) {
    const n = matrix.length;
    const x = Math.floor(n/ 2);
    const y = n - 1;
    for (let i = 0; i < x; i++) {
       for (let j = i; j < y - i; j++) {
          var k = matrix[i][j];
          matrix[i][j] = matrix[y - j][i];
          matrix[y - j][i] = matrix[y - i][y - j];
          matrix[y - i][y - j] = matrix[j][y - i]
          matrix[j][y - i] = k
       }
    }
    return matrix;
}

function rotateGridAnticlockwise(matrix) {
    return rotateGridClockwise(rotateGridClockwise(rotateGridClockwise(matrix))); //Rotating 270deg = rotating -90 deg
}

function blockObstructedLeft() {
    var fallingBlockObstructedLeft = false;
    for(var i = 0; i < fallingBlock.length; i++) {
        var row = fallingBlock[i];
        for(var j = 0; j < row.length; j++) {
            if (row[j] > 0) {
                var tileAtLeftWall = ( j + fallingBlockCoords[0] - 1 < 0 );

              	var tileToLeft = false;
                if (!tileAtLeftWall) {
                    tileToLeft = (board[i+fallingBlockCoords[1]][j+fallingBlockCoords[0]-1] > 0);
                }

                if (tileAtLeftWall || tileToLeft) {
                    fallingBlockObstructedLeft = true;
                }
            } 
        }
    }
    return fallingBlockObstructedLeft;
}

function blockObstructedRight() {
    var fallingBlockObstructedRight = false;
    for(var i = 0; i < fallingBlock.length; i++) {
        var row = fallingBlock[i];
        for(var j = 0; j < row.length; j++) {
            if (row[j] > 0) {
                var tileAtRightWall = ( j + fallingBlockCoords[0] + 1 >= boardWidth );

                var tileToRight = false;
                if (!tileAtRightWall) {
                    tileToRight = (board[i+fallingBlockCoords[1]][j+fallingBlockCoords[0]+1] > 0);
                }
                if (tileAtRightWall || tileToRight) {
                    fallingBlockObstructedRight = true;
                }
            } 
        }
    }
    return fallingBlockObstructedRight;
}

function blockObstructedDown() {
    var fallingBlockObstructedDown = false;
    for(var i = 0; i < fallingBlock.length; i++) {
        var row = fallingBlock[i];
        for(var j = 0; j < row.length; j++) {
            if (row[j] > 0) {
                var tileAtBottom = ( i + fallingBlockCoords[1] + 1 >= boardHeight );
              	var tileBelow = false;
                if (!tileAtBottom) {
                    tileBelow = (board[i+fallingBlockCoords[1]+1][j+fallingBlockCoords[0]] > 0);
                }
                if (tileAtBottom || tileBelow) {
                    fallingBlockObstructedDown = true;
                }
            } 
        }
    }
    return fallingBlockObstructedDown
}

function blockObstructedCurrent() {
    var fallingBlockObstructed = false;
    for(var i = 0; i < fallingBlock.length; i++) {
        var row = fallingBlock[i];
        for(var j = 0; j < row.length; j++) {
            if (row[j] > 0) {
                var tilePastBottom = ( i + fallingBlockCoords[1] >= boardHeight );
                var tilePastLeftWall = ( j + fallingBlockCoords[0] < 0 );
                var tilePastRightWall = ( j + fallingBlockCoords[0] >= boardWidth );
                var blocksOverlapping = (board[i+fallingBlockCoords[1]][j+fallingBlockCoords[0]] > 0)
                if (blocksOverlapping || tilePastBottom || tilePastLeftWall || tilePastRightWall) {
                    fallingBlockObstructed = true;
                }
            } 
        }
    }
    return fallingBlockObstructed
}

function update(tick,controls) {

    if (controls["z"]) {
        fallingBlock = rotateGridAnticlockwise(fallingBlock);
        if (blockObstructedCurrent()) {
            fallingBlock = rotateGridClockwise(fallingBlock);
        }
    }
    if (controls["x"]) {
        fallingBlock = rotateGridClockwise(fallingBlock);
        if (blockObstructedCurrent()) {
            fallingBlock = rotateGridAnticlockwise(fallingBlock);
        }
    }

    //Left + Right collision check
    if (controls["ArrowLeft"] && !blockObstructedLeft()) {
        fallingBlockCoords[0] -= 1;
    }
    if (controls["ArrowRight"] && !blockObstructedRight()) {
        fallingBlockCoords[0] += 1;
    }

    if (!blockObstructedDown()) {
        if (tick % 24 == 0 || controls["ArrowDown"]) {
            fallingBlockCoords[1] += 1;
        }
    } else {
        //Add falling block to board
        for(var i = 0; i < fallingBlock.length; i++) {
            var row = fallingBlock[i];
            for(var j = 0; j < row.length; j++) {
                if (row[j] > 0) {
                    board[i+fallingBlockCoords[1]][j+fallingBlockCoords[0]] = row[j];
                    /*
                    var tileAtBottom = ( i + fallingBlockCoords[1] + 1 >= boardHeight )
                    if (!tileAtBottom) {
                        var tileAboveTile = (board[i+fallingBlockCoords[1]+1][j+fallingBlockCoords[0]] > 0)
                    } else {
                        var tileAboveTile = false;
                    }
                    if (tileAtBottom || tileAboveTile) {
                        fallingBlockObstructed = true;
                    }
                    */
                } 
            }
        } 
        //Get new falling block
        fallingBlockCoords = [ (boardWidth-4)/2 , 0];
        fallingBlockIndex = Math.floor(Math.random() * 7);
        fallingBlock = blocks[fallingBlockIndex];


        for(var i = 0; i < board.length; i++) {
            var row = board[i];
            var rowClear = true;
            for(var j = 0; j < row.length; j++) {
                if (row[j] <= 0) {
                    rowClear = false;
                } 
            }
            if (rowClear) {
                for(var k = i; k >= 0; k--) {
                    if (k == 0) {
                        board[k] = Array(boardWidth).fill(0);
                    } else {
                        board[k] = board[k-1];
                    }
                }
            }
        }
    }
}

function drawBoard(ctx,tileSize) {
    var xOffset = (ctx.canvas.width-(tileSize*boardWidth))/2;
    var yOffset = (ctx.canvas.height-(tileSize*boardHeight))/2;

    ctx.fillStyle = boardColour;
    ctx.fillRect(xOffset,yOffset,tileSize*boardWidth,tileSize*boardHeight);

    for(var i = 0; i < board.length; i++) {
        var row = board[i];
        for(var j = 0; j < row.length; j++) {
            if (colours[row[j]] > -1) {
                ctx.drawImage(tileImg,xOffset+(tileSize*j),yOffset+(tileSize*i),tileSize,tileSize);
                ctx.globalCompositeOperation = "hue";
                ctx.fillStyle = `hsl(${colours[row[j]]},100%,50%)`;
                ctx.fillRect(xOffset+(tileSize*j),yOffset+(tileSize*i),tileSize,tileSize);
                ctx.globalCompositeOperation = "source-over";

            } 
        }
    }

    for(var i = 0; i < fallingBlock.length; i++) {
        var row = fallingBlock[i];
        for(var j = 0; j < row.length; j++) {
            if (colours[row[j]] > -1) {
                ctx.drawImage(tileImg,xOffset+(tileSize*(j+fallingBlockCoords[0])),yOffset+(tileSize*(i+fallingBlockCoords[1])),tileSize,tileSize);
                ctx.globalCompositeOperation = "hue";
                ctx.fillStyle = `hsl(${colours[row[j]]},100%,50%)`;
                ctx.fillRect(xOffset+(tileSize*(j+fallingBlockCoords[0])),yOffset+(tileSize*(i+fallingBlockCoords[1])),tileSize,tileSize);
                ctx.globalCompositeOperation = "source-over";
            } 
        }
    }
}



export { initBoard, drawBoard, update };