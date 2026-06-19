function two_sum(arr, k=0) {
  let [left, right] = [0, arr.length-1]

  while (left < right) {
    const sum = arr[left] + arr[right]
    if (sum === k) {
      return true
    }

    if(sum > 0) {
      right--
    } else {
      left++
    }
  }
  return false
}


const test1 = [-5,-2,-1,1,1,10]
console.log(test1, two_sum(test1))

const test2 =  [-3,0,0,1,2]
console.log(test2, two_sum(test2))

const test3 =  [-5,-3,-1,0,2,4,6]
console.log(test3, two_sum(test3))
