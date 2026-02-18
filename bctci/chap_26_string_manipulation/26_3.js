function stringMatching(string, match) {
  let matchStringIndex = 0

  for (let i=0; i < string.length; i++) {
    if(string[i] === match[matchStringIndex]) {
      matchStringIndex++
    } else {
      matchStringIndex = 0
    }

    if(matchStringIndex === match.length) {
      return i - (matchStringIndex - 1)
    }
  }

  return -1
}

console.log(stringMatching("split by space", "by"))
console.log(stringMatching("Ruan Ferreira", " rreira"))
