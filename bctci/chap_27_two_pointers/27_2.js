// my solution
function _smaller_prefixes(integers) {
  let [slower, faster] = [0,0]
  let [slowerSum, fasterSum] = [0,0]

  while (slower < integers.length / 2 || faster <= integers.length) {
    if (slower * 2 === faster) {
      console.log("slower", slower, slowerSum)
      console.log("faster", faster, fasterSum)
      if (slowerSum <= fasterSum) {
        slower++
        slowerSum += integers[slower-1]
      } else {
        return false
      }
    } else {
      faster++
      fasterSum += integers[faster-1]
    }
  }

  return true
}

// solution from the book. Is a better aprroach as it uses one cicle to sum slower and faster pointers
function smaller_prefixes(integers) {
  let [slower, faster] = [0,0]
  let [slowerSum, fasterSum] = [0,0]

  while (faster <= integers.length) {
    slowerSum += integers[slower]
    fasterSum += integers[faster] + integers[faster+1]

    if(slowerSum > fasterSum) {
      return false
    }

    slower += 1
    faster += 2
  }
  return true
}

const test1 = [1,2,2,-1]
const test2 = [1,2,-2,1,3,5]
const test3 = [5,2,-2,1,3,5]
console.log(test1, smaller_prefixes(test1))
console.log(test2, smaller_prefixes(test2))
console.log(test3, smaller_prefixes(test3))
