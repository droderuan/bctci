function merge_two_sorted_arrays(arr1, arr2) {
  const result = []

  let [pointer1, pointer2] = [0, 0]

  while (pointer1 < arr1.length || pointer2 < arr2.length) {
    if(pointer1 >= arr1.length) {
      result.push(arr2[pointer2])
      pointer2++
      continue
    }
    if(pointer2 >= arr2.length) {
      result.push(arr1[pointer1])
      pointer1++
      continue
    }

    if(arr1[pointer1] <= arr2[pointer2]) {
      result.push(arr1[pointer1])
      pointer1++
    } else {
      result.push(arr2[pointer2])
      pointer2++
    }
  }
  return result
}


const test1 = [[1,2,3,4], [1,2,3,4,5,6,7]]
console.log(test1, merge_two_sorted_arrays(test1[0], test1[1]))

const test2 =  [[8,10,12], [1,2,9,11]]
console.log(test2, merge_two_sorted_arrays(test2[0], test2[1]))

const test3 =  [[-1,2,3,4], []]
console.log(test3, merge_two_sorted_arrays(test3[0], test3[1]))

const test4 =  [[-1], [-2]]
console.log(test4, merge_two_sorted_arrays(test4[0], test4[1]))
