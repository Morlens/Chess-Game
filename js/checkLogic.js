function isInCheck(color) {
    let kingPiece = color === "white" ? "K" : "k";
    let kingIndex = board.indexOf(kingPiece);

    let kingRow = 8 - Math.floor(kingIndex / 8);
    let kingColumn = (kingIndex % 8) + 1

    for(let i = 0; i < board.length; i++){
        let square = board[i];

        if(square === "") continue; //skip empty squares

        if(color === "white" && square === square.toLowerCase() || color === "black" &&
        square === square.toUpperCase()){
            console.log("Found enemy piece");

            let pieceRow = 8 - Math.floor(i / 8);
            let pieceColumn = (i % 8) + 1;

            if (square.toLowerCase() === 'q'){
                if(moveQueen(pieceColumn,pieceRow,kingColumn,kingRow)) return true;
            }
            else if(square.toLowerCase() === 'b'){
                if(moveBishop(pieceColumn,pieceRow,kingColumn,kingRow)) return true;
            }
            else if(square.toLowerCase() === 'r'){
                if(moveRook(pieceColumn,pieceRow,kingColumn,kingRow)) return true;
            }
            else if(square.toLowerCase() === 'n'){
                if(moveKnight(pieceColumn,pieceRow,kingColumn,kingRow)) return true;
            }  
            else if(square.toLowerCase() === 'p'){
                const direction = color === "white" ? -1 : 1;
                const startRow = color === "white" ? 7 : 2;

                if (movePawn(pieceColumn, pieceRow, kingColumn, kingRow, square, board[kingIndex],
                     direction, startRow)) return true;
            }
            else{
              if(moveKing(pieceColumn, pieceRow, kingColumn, kingRow)) return true;
            }
        }
    }
    return false;
} 

function highlightCheck() {
    // Clear any previous red highlights 
    document.querySelectorAll(".gamecell").forEach(cell => {
        cell.style.backgroundColor = "";
    });

    // Check both kings and highlight red if in check
    ["white", "black"].forEach(color => {
        if (isInCheck(color)) {
            let kingPiece = color === "white" ? "K" : "k";
            let kingIndex = board.indexOf(kingPiece);
            let kingCol = (kingIndex % 8) + 1;
            let kingRow = 8 - Math.floor(kingIndex / 8);
            let kingCell = document.getElementById(`${kingCol}_${kingRow}`);
            kingCell.style.backgroundColor = "red";
        }
    });
}
 
function isCheckmate(color) {

}
 
function isStalemate(color) {

}
 