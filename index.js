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
    
    //call moveBishop() func if selected gamecell is Bishop 
    if(selectedPiece.toLowerCase() === 'b'){
        if(!moveBishop(fc,fr,tc,tr)) return;
    }

    //call moveRook() func if selected gamecell is Rook
    if(selectedPiece.toLowerCase() === 'r'){
        if(!moveRook(fc,fr,tc,tr)) return;
    }

    //call moveKnight() func if selected gamecell is Knight
    if(selectedPiece.toLowerCase() === 'n'){
        if(!moveKnight(fc,fr,tc,tr)) return;
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

function moveBishop(fc, fr, tc, tr){

    //bishop should move diagonally
    if(Math.abs(tc - fc) !== Math.abs(tr - fr)) return false;

    //bishop direction
    let rowDirection = tr > fr ? 1 : -1;
    let colDirection = tc > fc ? 1 : -1;

    //checking each square along the path (excluding destination)
    let r = fr + rowDirection;
    let c = fc + colDirection;

    //keep looping when target destination is not reached
    while(r !== tr && c !== tc){
        let index = (8 - r) * 8 + (c - 1);
        if(board[index] !== "")return false; //path is blocked
        r += rowDirection;
        c += colDirection; 
    }
    return true;

}

function moveRook(fc, fr, tc, tr){

    // 1 up, -1 down, 0 if moving horizontally
    // 1 right, -1 left, 0 if moving vertically
    let rowDirection = tr > fr ? 1 : tr < fr ? -1 : 0
    let colDirection = tc > fc ? 1 : tc < fc ? -1 : 0
    
    //rook direction
    let r = fr + rowDirection;
    let c = fc + colDirection;
    
    if(tc !== fc && tr === fr || tc === fc && tr !== fr){
     while(r === tr && c !== tc || r !== tr && c === tc){
        let index = (8 - r) * 8 + (c - 1);
        if(board[index] !== "")return false;
        r += rowDirection;
        c += colDirection;
     }
    return true;
    }
  return false; 
}

function moveKnight(fc, fr, tc, tr){
  
    if((Math.abs(tc - fc) === 1 && Math.abs(tr - fr) === 2) || 
    (Math.abs(tc - fc) === 2 && Math.abs(tr - fr) === 1)) {return true;}

    return false;
}


 renderBoard();

