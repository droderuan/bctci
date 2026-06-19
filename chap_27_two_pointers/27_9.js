// my solution. Despite my solution and books's solution both have same time
// and space complexity, the book's solution has a better space complexity
// time complexity O(N) space complexity o(N)
function _sort_valley_shaped_array(arr) {
  let [left, right] = [0, arr.length-1]

  const sortInDecreasedOrder = new Array()

  while (left <= right) {
    if(arr[left] > arr[right]) {
      sortInDecreasedOrder.push(arr[left])
      left++
    } else {
      sortInDecreasedOrder.push(arr[right])
      right--
    }
  }

  const sortInIncreaseOrder = []

  for (let i=sortInDecreasedOrder.length-1; i>=0; i--)
  sortInIncreaseOrder.push(sortInDecreasedOrder[i])

  return sortInIncreaseOrder
}

// the clever approach was to create only one arr and push to the end of it.
function sort_valley_shaped_array(arr) {
  let [left, right] = [0, arr.length-1]

  const sortInOrderResult = new Array(arr.length)
  let sortLastFreeIndex = arr.length-1

  while (left <= right) {
    if(arr[left] > arr[right]) {
      sortInOrderResult[sortLastFreeIndex] = arr[left]
      sortLastFreeIndex--
      left++
    } else {
      sortInOrderResult[sortLastFreeIndex] = arr[right]
      sortLastFreeIndex--
      right--
    }
  }

  return sortInOrderResult
}


const test1 = [8,4,2,6]
console.log(test1, sort_valley_shaped_array(test1))

const test2 = [1,2]
console.log(test2, sort_valley_shaped_array(test2))

const test3 =  [2,2,1,1]
console.log(test3, sort_valley_shaped_array(test3))

const test4 =  [20,15,11,6,5,2,1,10,16]
console.log(test4, sort_valley_shaped_array(test4))
