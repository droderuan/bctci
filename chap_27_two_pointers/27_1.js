function is_palindrome(word) {
  let [left, right] = [0, word.length-1]

  while (left < right) {
    if(word[left] === word[right]) {
      left++
      right--
    } else {
      return false
    }
  }

  return true
}

console.log("level: ", is_palindrome("level"))
console.log("naan: ", is_palindrome("naan"))
console.log("ruan: ", is_palindrome("ruan"))
