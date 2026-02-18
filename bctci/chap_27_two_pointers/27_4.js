function palindromic_sentence(s) {
  let [left, right] = [0, s.length-1]
  const normalizedSentence = s.toLowerCase()

  const charsToIgnore = new Set([" ", ",", "'", '"', "!", "?"])

  while (left < right) {
    if(normalizedSentence[left] === normalizedSentence[right]) {
      left++
      right--
      continue
    }


    if(charsToIgnore.has(normalizedSentence[left])) {
      left++
      continue
    }

    if(charsToIgnore.has(normalizedSentence[right])) {
      right--
      continue
    }
    return false
  }
  return true
}

const test1 = "Bob wondered, 'Now, Bob?'"
console.log(test1, palindromic_sentence(test1))

const test2 = "Ruan naur"
console.log(test2, palindromic_sentence(test2))

const test3 = "Ruan"
console.log(test3, palindromic_sentence(test3))

const test4 = ""
console.log(test4, palindromic_sentence(test4))
