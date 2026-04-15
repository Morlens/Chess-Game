let board = ["r","n", "b", "q", "k", "b", "n", "r",
             "p","p", "p", "p", "p", "p", "p", "p",
             "", "", "", "", "", "", "", "",
             "", "", "", "", "", "", "", "",
             "", "", "", "", "", "", "", "",
             "", "", "", "", "", "", "", "",
             "P","P", "P", "P", "P", "P", "P", "P",
             "R","N", "B", "Q", "K", "B", "N", "R"
            ]

function renderBoard(){
    for(let row = 8; row >= 1; row--){
        for(let column = 1; column <= 8; column++){
            let cell = document.getElementById(`${column}_${row}`); 
            let index = (8 - row) * 8 + (column - 1);
            let piece = board[index];

           // console.log(board[index]);
            cell.textContent = getPieceSymbol(piece);
        }
    }
}


function getPieceSymbol(piece) {
    const pieces = {
        "r": "♜", "n": "♞", "b": "♝", "q": "♛", "k": "♚", "p": "♟",
        "R": "♖", "N": "♘", "B": "♗", "Q": "♕", "K": "♔", "P": "♙"
    };

    return pieces[piece] || "";
}
renderBoard();  