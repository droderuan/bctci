// my solution -> not working for all cases. For example, [[2,7,8], [3,4,7,8]]
// I assumed that the smaller array is a subset of the bigger.
function _array_intersection(arr1, arr2) {
  let [smallerPointer, biggerPointer] = [0,0]

  let smallerArr = []
  let biggerArr = []

  if(arr1.length < arr2.length) {
    smallerArr = arr1
    biggerArr = arr2
  } else {
    smallerArr = arr2
    biggerArr = arr1
  }
  const result = []
  while (smallerPointer < smallerArr.length && biggerPointer < biggerArr.length ) {
    if(smallerArr[smallerPointer] === biggerArr[biggerPointer]) {
      result.push(smallerArr[smallerPointer])
      smallerPointer++
      biggerPointer++
      continue
    }

    biggerPointer++
  }

  return result
}

// the difference here is to use the sort property of both arrays, like a monotonic property.
function array_intersection(arr1, arr2) {
  let [pointer1, pointer2] = [0, 0]

  const result = []

  while (pointer1 < arr1.length && pointer2 < arr2.length) {
    if(arr1[pointer1] === arr2[pointer2]) {
      result.push(arr1[pointer1])
      pointer1++
      pointer2++
    } else if (arr1[pointer1] < arr2[pointer2]) {
      pointer1++
    } else {
      pointer2++
    }
  }
  return result
}

const test1 = [[1,2,2,5], [1,5]]
const test2 = [[1,2,6,10], [1,2,3,4,5,6,7,8]]
const test3 = [[1,1,1,1,1], [2,2,2,2,2,2]]
const test4 = [[2,7,8], [3,4,7,8]]
console.log(test1, array_intersection(test1[0], test1[1]))
console.log(test2, array_intersection(test2[0], test2[1]))
console.log(test3, array_intersection(test3[0], test3[1]))
console.log(test4, array_intersection(test4[0], test4[1]))
