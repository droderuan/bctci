// doing is_after just to do different from the book
// read this as "my target is after this index?"
function is_after(arr, i) {
  return i === arr.length - 1 || arr[i] < arr[i+1]
}

function valley_bottom(arr) {
  let [l, r] = [0, arr.length-1]

  if(is_after(arr, l)) {
    return arr[l]
  }

  while (r - l > 1) {
    mid = Math.floor((l+r)/2)

    if(is_after(arr, mid)) {
      r = mid
    } else {
      l = mid
    }
  }

  return arr[r]
}

const test1 = [6,5,4,7,9]
console.log(test1, valley_bottom(test1))

const test2 = [5,6,7]
console.log(test2, valley_bottom(test2))

const test3 = [7,6,5]
console.log(test3, valley_bottom(test3))
