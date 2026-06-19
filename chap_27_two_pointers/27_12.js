function array_reversal(arr) {
  let [left, right] = [0, arr.length-1]

  while (left <= right) {
    const tempChar = arr[left]
    arr[left] = arr[right]
    arr[right] = tempChar
    left++
    right--
  }
}


const test1 = "ruan".split("")
console.log(test1)
console.log(array_reversal(test1), test1)

const test2 = "Hello world!".split("")
console.log(test2)
console.log(array_reversal(test2), test2)

const test3 = "Bob wondered, 'Now, Bob?'".split("")
console.log(test3)
console.log(array_reversal(test3), test3)
