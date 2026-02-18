function stringSplit(string, separator) {
  let result = new Array()

  let accumulator = new Array()

  for (let i=0; i < string.length; i++) {
    if(string[i] === separator) {
      result.push(accumulator.join(""))
      accumulator = new Array()
    } else {
      accumulator.push(string[i])
    }
  }

  result.push(accumulator.join(""))
  return result
}

console.log(stringSplit("beekeeper needed", "e"))
console.log(stringSplit("/home/./..//Doocuments/", "/"))
