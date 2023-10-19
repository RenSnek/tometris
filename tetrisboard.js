var board = []

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

function drawBoard(ctx) {

}

export { initBoard, drawBoard }