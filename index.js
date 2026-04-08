let board = ["r","n", "b", "q", "k", "b", "n", "r",
             "p","p", "p", "p", "p", "p", "p", "p",
             "", "", "", "", "", "", "", "",
             "", "", "", "", "", "", "", "",
             "", "", "", "", "", "", "", "",
             "", "", "", "", "", "", "", "",
             "P","P", "P", "P", "P", "P", "P", "P",
             "R","N", "B", "Q", "K", "R", "N", "R"
            ]

function renderBoard(){
    for(let y = 8; y >= 1; y--){
        for(let x = 1; x <= 8; x++){
            let cell = document.getElementById(`${x}_${y}`);
            let index = (8 - y) * 8 + (x - 1);
            let piece = board[index];

            console.log(board[index]);
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
