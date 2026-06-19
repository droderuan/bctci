// I hated this problem
function three_way_merge_without_duplicates(arr1, arr2, arr3) {
  const result = []
  const resultValues = new Set()
  let [left1, left2, left3] = [0, 0, 0]

  while (left1 < arr1.length && left2 < arr2.length && left3 < arr3.length ) {
    if (arr1[left1] <= arr2[left2] && arr1[left1] <= arr3[left3]) {
      if(!resultValues.has(arr1[left1])) {
        result.push(arr1[left1])
        resultValues.add(arr1[left1])
      }
      left1++
    } else if (arr2[left2] <= arr1[left1] && arr2[left2] <= arr3[left3]) {
      if(!resultValues.has(arr2[left2])) {
        result.push(arr2[left2])
        resultValues.add(arr2[left2])
      }
      left2++
    } else {
      if(!resultValues.has(arr3[left3])) {
        result.push(arr3[left3])
        resultValues.add(arr3[left3])
      }
      left3++
    }
  }
  const remainValue1 = left1 < arr1.length
  const remainValue2 = left2 < arr2.length

  let [remaining1, remaining2] = [[], []]
  let [remainingPointer1, remainingPointer2] = [0, 0]

  if(!remainValue1) {
    remaining1 = arr2
    remainingPointer1 = left2
    remaining2 = arr3
    remainingPointer2 = left3
  } else if(!remainValue2) {
    remaining1 = arr1
    remainingPointer1 = left1
    remaining2 = arr3
    remainingPointer2 = left3
  } else {
    remaining1 = arr1
    remainingPointer1 = left1
    remaining2 = arr2
    remainingPointer2 = left2
  }

  console.log("result", result)
  console.log(remaining1, remainingPointer1)
  console.log(remaining2, remainingPointer2)

  while (remainingPointer1 < remaining1.length && remainingPointer2 < remaining2.length ) {
    if (remaining1[remainingPointer1] < remaining2[remainingPointer2]) {
      if(!resultValues.has(remaining1[remainingPointer1])) {
        result.push(remaining1[remainingPointer1])
        resultValues.add(remaining1[remainingPointer1])
      }
      remainingPointer1++
    }
    else {
      if(!resultValues.has(remaining2[remainingPointer2])) {
        result.push(remaining2[remainingPointer2])
        resultValues.add(remaining2[remainingPointer2])
      }
      remainingPointer2++
    }
  }


  while (remainingPointer1 < remaining1.length ) {
    if(!resultValues.has(remaining1[remainingPointer1])) {
      result.push(remaining1[remainingPointer1])
      resultValues.add(remaining1[remainingPointer1])
    }
    remainingPointer1++
  }

  while (remainingPointer2 < remaining2.length ) {
    if(!resultValues.has(remaining2[remainingPointer2])) {
      result.push(remaining2[remainingPointer2])
      resultValues.add(remaining2[remainingPointer2])
    }
    remainingPointer2++
  }

  return result
}


const test1 = [[2,3,3,4,5,7], [3,3,9], [3,3,9]]
console.log(test1, three_way_merge_without_duplicates(test1[0], test1[1], test1[2]))

const test2 = [[2,3,3,4,5,70], [3,30,90], [-1, 3,3,9]]
console.log(test2, three_way_merge_without_duplicates(test2[0], test2[1], test2[2]))

// const test3 =  [-5,-3,,0,2,4,6]
// console.log(test3, two_sum(test3))
