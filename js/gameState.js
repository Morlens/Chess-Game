
let selectedSquare = null;
let currentTurn = "white"; ////white always starts first
let enPassantSquare = "";
let turn = document.querySelector("#turn span");

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
        const prevCell = document.getElementById(selectedSquare);

        // Clicked the same square — deselect
        if (clickedId === selectedSquare) {
            selectedSquare = null;
            highlightCheck(); 
            return;
        }

        movePiece(selectedSquare, clickedId);

        // Remove highlight then restore check highlight
        prevCell.style.backgroundColor = "";
        highlightCheck();

        selectedSquare = null;
    }
}


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
    //call moveQueen() func if selected gamecell is Queen
    if(selectedPiece.toLowerCase() === 'q'){
        if(!moveQueen(fc,fr,tc,tr)) return;
    }
    //call moveKing() func if selected gamecell is King
    if(selectedPiece.toLowerCase() === 'k'){
        if(!moveKing(fc,fr,tc,tr)) return;
    }

    board[toCellIndex] = selectedPiece;
    board[fromCellIndex] = "";

    if (isInCheck(currentTurn)) {
        board[fromCellIndex] = selectedPiece;
        board[toCellIndex] = targetPiece;
        highlightCheck();
        return;
    }

    renderBoard();
    highlightCheck();

    currentTurn = currentTurn === "white" ? "black" : "white";
    turn.textContent = currentTurn === "white" ? "White's Turn" : "Black's Turn";

}

