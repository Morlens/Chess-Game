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
//white always starts first
let currentTurn = "white";
let enPassantSquare = "";
let turn = document.querySelector("#turn span");

function movePiece(from, to) {

    //id of gamecells in html file convert to number
    let [fc, fr] = from.split("_").map(Number);
    let [tc, tr] = to.split("_").map(Number);
    
    //piece current location 
    let fromCellIndex = (8 - fr) * 8 + (fc - 1);
    //piece destination
    let toCellIndex= (8 - tr) * 8 + (tc - 1);

    let selectedPiece = board[fromCellIndex];
    let targetPiece = board[toCellIndex];

    //Block move if a black's piece is selected on white's turn and vice versa.
    if(selectedPiece === selectedPiece.toUpperCase() && currentTurn === "black" || 
        selectedPiece === selectedPiece.toLowerCase() &&  currentTurn === "white"){ 
        return;
    }

    //if game cell is not empty and both pieces are on the same team, block the move
    if(targetPiece !== '' &&
      (
       ( selectedPiece === selectedPiece.toUpperCase() && targetPiece === targetPiece.toUpperCase()) ||
       ( selectedPiece === selectedPiece.toLowerCase() && targetPiece === targetPiece.toLowerCase())
      )
    ) {
        return;
    }

    // Determine the piece's color, its current column, and movement direction
    let direction = (selectedPiece === selectedPiece.toUpperCase()) ? 1 : -1;
    let startRow = (selectedPiece === selectedPiece.toUpperCase()) ? 2 : 7; 
    
    //call movePawn function if selected gamecell is pawn 
    if(selectedPiece.toLowerCase() === 'p'){
        let allowed = movePawn(fc,fr,tc,tr,selectedPiece,targetPiece,direction,startRow);
        if (!allowed) return;

        //en passant capture
        if(tc !== fc && targetPiece === ""){
            let capturedIndex = (8 - fr) * 8 + (tc - 1);
            board[capturedIndex] = "";
        }

        //if pawn just did 2 square jump, save the skipped square for en passant
        if(Math.abs(tr - fr) === 2 && fr === startRow){
            enPassantSquare = `${fc}_${fr + direction}`;
        } else {
             //no en passant available next turn
            enPassantSquare = "";
        }
    }



    board[toCellIndex] = selectedPiece;
    board[fromCellIndex] = "";

    renderBoard();

    currentTurn = currentTurn === "white" ? "black" : "white";
    turn.textContent = currentTurn === "white" ? "White's Turn" : "Black's Turn";

}




function movePawn(fc, fr, tc, tr, piece, target, direction, startRow) {

    //Pawn capture
    if(Math.abs(tc - fc) === 1 && tr === fr + direction){
        if(target !== "")return true;
        if(`${tc}_${tr}` === enPassantSquare )return true;

    }

    //Pawn's only move straight in column if no capture
    if (tc !== fc ){
        return false;
    }

    //Move 1 square up or down depending on pawn color
    if(tr === fr + direction){
        if(target === '') return true;
    }

    //Move 2 square's up or down depending on pawn color
    if (tr === fr + direction * 2 && fr === startRow){
        let middleIndex = (8 - (fr + direction)) * 8 + (fc - 1);
        if(target === "" && board[middleIndex] === ""){
            return true;
        }
    }
    return false;
}

    

 renderBoard();

