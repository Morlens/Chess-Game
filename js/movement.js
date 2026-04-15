

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

function moveQueen(fc,fr,tc,tr){
    
    // copy pasted logic from moveRook() and moveBishop() func
    let rowDirection = tr > fr ? 1 : tr < fr ? -1 : 0
    let colDirection = tc > fc ? 1 : tc < fc ? -1 : 0
    
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
    else if(Math.abs(tc - fc) === Math.abs(tr - fr)){
     while(r !== tr && c !== tc){
        let index = (8 - r) * 8 + (c - 1);
        if(board[index] !== "")return false; //path is blocked
        r += rowDirection;
        c += colDirection; 
        }    
     return true;
    }
        
  return false;
}  

function moveKing(fc, fr, tc, tr){

    if(Math.abs(tc - fc) <= 1 && Math.abs(tr - fr) <= 1) return true;

    return false;
}



