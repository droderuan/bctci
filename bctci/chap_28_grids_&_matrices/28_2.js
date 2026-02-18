function getPieceMoveSet(piece) {
  if(piece==="knight") {
    return [[-1, -2], [-2, -1], [-2, 1], [-1, 2], [1, 2], [2, 1], [2, -1], [1, -2]]
  } else if (piece==="king") {
    return [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]]
  } else if (piece==="queen") {
    return [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1], [0, 1],
      [1, -1], [1, 0], [1, 1],
    ]
  } else {
    throw new Error("Unkown piece")
  }
}

function isValidMove(board, r, c, move) {
  const nextRow = r + move[0]
  const nextColumn = c + move[1]
  return nextRow >= 0 && nextRow < board.length && nextColumn >= 0 && nextColumn < board[0].length
}

function fillBoardWithQueenMoves(board, r, c) {
  const pieceMoveSet = getPieceMoveSet("queen")

  for(let move of pieceMoveSet){
    let [nextR, nextC] = [r, c]

    while(isValidMove(board, nextR, nextC, move)) {
      [nextR, nextC] = [nextR+move[0], nextC+move[1]]
      board[nextR][nextC] = 1
    }
  }
}

// my solution
// time complexity O(R*C*Q) or O(N^2*Q), where Q is the quantity of queens
function chess_moves(board) {
  const safeBoard = new Array()

  for (let r=0; r < board.length; r++) {
    safeBoard.push(new Array(board[0].length))
    for (let c=0; c < safeBoard[r].length; c++) {
      safeBoard[r][c] = 0
    }
  }

  for (let r=0; r < safeBoard.length; r++) {
    for (let c=0; c < safeBoard[r].length; c++) {
      if(board[r][c] === 1) {
        safeBoard[r][c] = 1
        fillBoardWithQueenMoves(safeBoard, r, c)
      }
    }
  }


  return safeBoard
}

const test1 = [
  [ 0, 0, 0, 0, 0, 0 ],
  [ 0, 1, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 1, 0 ],
  [ 0, 0, 0, 0, 1, 0 ],
  [ 0, 0, 0, 0, 0, 0 ]
]

console.log(chess_moves(test1))
console.log(test1)
