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


let selectedSquare = null;

document.querySelectorAll(".gamecell").forEach(cell =>{
    cell.addEventListener("click", handleClick);
});

function handleClick(event){
    const cell = event.currentTarget;
    const clickedId = cell.id;
    
    //FIRST CLICK
    if(selectedSquare === null){
        //ignore empty square
        if(cell.textContent === "")return;
            
        selectedSquare = clickedId;
        cell.style.backgroundColor = "yellow" //highlight
    }

    //SECOND CLICK
    else{
        movePiece(selectedSquare, clickedId);

        //remove highlight
        document.getElementById(selectedSquare).style.backgroundColor = "";

        selectedSquare = null;
    }
}


function movePiece(from, to) {
    //id of gamecells in html file convert to number
    let [fx, fy] = from.split("_").map(Number);
    let [tx, ty] = to.split("_").map(Number);
    
    //piece current location 
    let fromCellIndex = (8 - fy) * 8 + (fx - 1);
    //piece destination
    let toCellIndex= (8 - ty) * 8 + (tx - 1);

    let selectedPiece = board[fromCellIndex];
    let targetPiece = board[toCellIndex];

    if(targetPiece !== '' &&
      (
       ( selectedPiece === selectedPiece.toUpperCase() && targetPiece === targetPiece.toUpperCase()) ||
       ( selectedPiece === selectedPiece.toLowerCase() && targetPiece === targetPiece.toLowerCase())
      )
    ) {
        return;
    }
    

    board[toCellIndex] = selectedPiece;
    board[fromCellIndex] = "";


 renderBoard();
}
 renderBoard();

