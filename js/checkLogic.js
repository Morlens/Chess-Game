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
        }
    }
}
 
function isCheckmate(color) {

}
 
function isStalemate(color) {

}
 