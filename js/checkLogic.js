function isInCheck(color) {
    let kingPiece = color === "white" ? "K" : "k";
    let kingIndex = board.indexOf(kingPiece);

    let kingRow = 8 - Math.floor(kingIndex / 8);
    let kingColumn = (kingIndex % 8) + 1

   
}
 
function isCheckmate(color) {

}
 
function isStalemate(color) {

}
 