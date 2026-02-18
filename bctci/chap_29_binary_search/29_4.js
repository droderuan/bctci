function is_before(arr, i, num) {
  return arr[i] + num > 0
}

function searchSum(k, arr) {
    let [l, r] = [0, arr.length-1]
    while (r - l > 1) {
      const mid = Math.floor((r+l)/2)

      if(is_before(arr, mid, k)) {
        r = mid
      } else {
        l = mid
      }
    }
    return l
}

// time complexity O(log N1 * N2)
function two_array_two_sum(arr1, arr2) {

  for (let i=0; i < arr2.length; i++) {
    const sortedArrayIndex = searchSum(arr2[i], arr1)

    if(arr2[i] + arr1[sortedArrayIndex] === 0) {
      return [sortedArrayIndex, i]
    }
  }
  return [-1, -1]
}

const test1 = [[-5,-4,-1,4,6,6,7], [-3,7,18,4,6]]
console.log(test1, two_array_two_sum(test1[0], test1[1]))

const test2 = [[5,6,7,10], [-5]]
console.log(test2, two_array_two_sum(test2[0], test2[1]))

const test3 = [[5,6,7,10,30], [5,30,-1,10]]
console.log(test3, two_array_two_sum(test3[0], test3[1]))
