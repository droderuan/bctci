function is_stole(t) {
  if (t<2000) {
    return t >= 1000 // simulating stolen at 1000
  } else {
    return t >= 5000 // simulating stolen at 5000
  }
}

function cctv_footage(t1, t2) {
  let [left, right] = [t1,t2]

  while(right - left > 1) {
    const middleTimestamp = Math.round((right + left) / 2)
    if(is_stole(middleTimestamp)) {
      right = middleTimestamp
    } else {
      left = middleTimestamp
    }
  }

  return right
}

const test1 = [500, 1500]
console.log(test1, cctv_footage(test1[0], test1[1]))

const test2 = [3000, 6000]
console.log(test2, cctv_footage(test2[0], test2[1]))
