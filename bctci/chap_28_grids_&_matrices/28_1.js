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
  return nextRow >= 0 && nextRow < board.length && nextColumn >= 0 && nextColumn < board[0].length && board[nextRow][nextColumn] !== 1
}

function chess_moves(board, piece, r, c) {
  const pieceMoveSet = getPieceMoveSet(piece)
  const validMoves = new Array()

  for (let move of pieceMoveSet) {
    if(piece === "queen") {
      let [nextR, nextC] = [r, c]
      while(isValidMove(board, nextR, nextC, move)) {
        [nextR, nextC] = [nextR+move[0], nextC+move[1]]
        validMoves.push([nextR, nextC])
      }
    } else {
      if(isValidMove(board, r, c, move)) {
        validMoves.push([r+move[0], c+move[1]])
      }
    }

  }
  return validMoves
}

const test1 = [
  [
    [0,0,0,1,0,0],
    [0,1,1,1,0,0],
    [0,1,0,1,1,0],
    [1,1,1,1,0,0],
    [0,0,0,0,0,0],
    [0,1,0,0,0,0],
  ],
  "king",
  3,
  5
]
console.log(chess_moves(test1[0],test1[1],test1[2],test1[3]))

const test2 = [
  [
    [0,0,0,1,0,0],
    [0,1,1,1,0,0],
    [0,1,0,1,1,0],
    [1,1,1,1,0,0],
    [0,0,0,0,0,0],
    [0,1,0,0,0,0],
  ],
  "knight",
  4,
  3
]
console.log(chess_moves(test2[0],test2[1],test2[2],test2[3]))

const test3 = [
  [
    [0,0,0,1,0,0],
    [0,1,1,1,0,0],
    [0,1,0,1,1,0],
    [1,1,1,1,0,0],
    [0,0,0,0,0,0],
    [0,1,0,0,0,0],
  ],
  "queen",
  4,
  4
]
console.log(chess_moves(test3[0],test3[1],test3[2],test3[3]))
