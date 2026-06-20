import { Heap } from "./37_1.js"

function sumOfFirstKPrimePowers(primes, k) {
  const trackableNumberList = primes.map(n => [n, n])
  const minHeap = new Heap(trackableNumberList, (a, b) => a[0] < b[0])

  let result = 0

  for (let i=0; i<k; i++) {
    const [power, base] = minHeap.pop()
    result += power
    minHeap.push([power * base, base])
  }
  return result
}

// let primes = [2]
// let k = 1
// console.log(sumOfFirstKPrimePowers(primes, k))

// primes = [5]
// k = 3
// console.log(sumOfFirstKPrimePowers(primes, k))

// primes = [2, 3]
// k = 7
// console.log(sumOfFirstKPrimePowers(primes, k))

// console.log("teste case 4: multiple primes, larger k -> sanity check merge order")
// primes = [2, 3, 5]
// k = 10
// console.log(sumOfFirstKPrimePowers(primes, k))

// console.log("teste case 5: result should exceed 10^9+7 -> checks if modulo is applied")
// primes = [2]
// k = 32
// console.log(sumOfFirstKPrimePowers(primes, k))
// // raw sum of 2^1..2^32 = 8589934590
// // 8589934590 % (10^9+7) = 589934534


function sumOfFirstKPrimePowers2(primes, k) {
  const moduleCeil = 10**9 + 7

  const trackableNumberList = primes.map(n => [n, n])
  const minHeap = new Heap(trackableNumberList, (a, b) => a[0] < b[0])

  let result = 0

  for (let i=0; i<k; i++) {
    const [power, base] = minHeap.pop()
    result = (result + power) % moduleCeil
    minHeap.push([(power * base) % moduleCeil, base])
  }

  return result
}

// primes = [2]
// k = 1
// console.log(sumOfFirstKPrimePowers2(primes, k))

// primes = [5]
// k = 3
// console.log(sumOfFirstKPrimePowers2(primes, k))

// primes = [2, 3]
// k = 7
// console.log(sumOfFirstKPrimePowers2(primes, k))

// console.log("teste case 4: multiple primes, larger k -> sanity check merge order")
// primes = [2, 3, 5]
// k = 10
// console.log(sumOfFirstKPrimePowers2(primes, k))

// console.log("teste case 5: result should exceed 10^9+7 -> checks if modulo is applied")
// primes = [2]
// k = 32
// console.log(sumOfFirstKPrimePowers2(primes, k))
// // raw sum of 2^1..2^32 = 8589934590
// // 8589934590 % (10^9+7) = 589934534

function runTests(sumOfPowers) {
  const tests = [
    // Example 1 from the book
    [[2], 1, 2],
    // Example 2 from the book
    [[5], 3, 155],
    // Example 3 from the book
    [[2, 3], 7, 69],
    // k is 0
    [[2, 3], 0, 0],
    // k < primes.length
    [[5, 7, 11, 13, 17, 19], 4, 36],
    // prime order doesn't matter
    [[19, 17, 13, 11, 7, 5], 4, 36],
  ];
  for (const [primes, n, want] of tests) {
    const got = sumOfPowers(primes, n);
    console.log("want:", want, "got:", got)

    if (got !== want) {
      throw new Error(
        `\nsumOfPowers(${JSON.stringify(primes)}, ${n}): got: ${got}, want: ${want}\n`,
      );
    }
  }
}

runTests(sumOfFirstKPrimePowers);
runTests(sumOfFirstKPrimePowers2);
