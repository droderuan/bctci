function search_in_sorted_array(arr, target) {
  let [left, right] = [0, arr.length-1]

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    const currentValue = arr[mid]

    if(currentValue === target) {
      return mid
    } else if( currentValue < target) {
      left = mid+1
    } else {
      right = mid-1
    }
  }

  return -1
}

const test1 = [[-2, 0, 3, 4, 7, 9, 11], 3]
console.log(test1, search_in_sorted_array(test1[0], test1[1]))

const test2 = [[-2, 0, 3, 4, 7, 9, 11], 2]
console.log(test2, search_in_sorted_array(test2[0], test2[1]))

const test3 = [[-2, 0, 3, 4, 7, 9, 11], 11]
console.log(test3, search_in_sorted_array(test3[0], test3[1]))

const test4 = [[], 11]
console.log(test4, search_in_sorted_array(test4[0], test4[1]))
