function interval_intersection(arr1, arr2) {
  let [pointer1, pointer2] = [0, 0]
  const resultPairs = new Array()

  while (pointer1 < arr1.length && pointer2 < arr2.length){
    const pair1 = arr1[pointer1]
    const pair2 = arr2[pointer2]

    if(pair1[1] < pair2[0]) {
      pointer1++
      continue
    }

    if(pair2[1] < pair1[0]) {
      pointer2++
      continue
    }

    if(pair1[1] >= pair2[0] && pair1[0] <= pair2[1]) {
      const start = Math.max(pair1[0], pair2[0])
      const end = Math.min(pair1[1], pair2[1])
      resultPairs.push([start, end])
    } else if (pair2[1] >= pair1[0] && pair2[0] <= pair1[1]) {
      const start = Math.max(pair1[0], pair2[0])
      const end = Math.min(pair1[1], pair2[1])
      resultPairs.push([start, end])
    }

    if(pair1[1] < pair2[1]) {
      pointer1++
    } else {
      pointer2++
    }

  }

  return resultPairs
}


const test1 = [[[0,1], [4,6], [7,8]], [[2,3], [5,9], [10,11]]]
console.log(test1, interval_intersection(test1[0], test1[1]))

const test2 = [[[2,4], [5,8]], [[3,3], [4,7]]]
console.log(test2, interval_intersection(test2[0], test2[1]))
