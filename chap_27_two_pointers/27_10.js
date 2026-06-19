function missing_numbers_in_range(arr, low, high) {
  let currentArrayIndex = 0
  let currentRangeValue = low

  const result = []

  while (currentRangeValue <= high) {
    if(arr[currentArrayIndex] < low) {
      currentArrayIndex++
      continue
    }

    if(arr[currentArrayIndex] === currentRangeValue) {
      currentArrayIndex++
    } else {
      result.push(currentRangeValue)
    }

    currentRangeValue++
  }

  return result
}


const test1 = [[6,9,12,15,18], 9, 13]
console.log(test1, missing_numbers_in_range(test1[0], test1[1], test1[2]))

const test2 = [[], 9, 9]
console.log(test2, missing_numbers_in_range(test2[0], test2[1], test2[2]))

const test3 = [[6,7,8,9], 7,8]
console.log(test3, missing_numbers_in_range(test3[0], test3[1], test3[2]))
