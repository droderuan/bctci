function stringJoin(arr, union) {
  let accumulator = []

  for (let i=0; i < arr.length; i++) {
    accumulator.push(arr[i])

    if(i+1 < arr.length) {
      accumulator.push(union)
    }
  }

  return accumulator.join("")
}

console.log(stringJoin(['b','','k','','p','r n','','d','d!!'], "ee"))
