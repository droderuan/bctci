import { Heap } from "./37_1.js"

class PopularSongs {
  constructor() {
    this.lowerHalfMaxHeap = new Heap([], (a, b) => a > b)
    this.upperHalfMinHeap = new Heap([], (a, b) => a < b)
    this.songPlaysMap = new Map()
  }

  registerPlays(title, plays) {
    this.songPlaysMap.set(title, plays)

    if (this.lowerHalfMaxHeap.size() === 0 ||
      plays <= this.lowerHalfMaxHeap.top()) {
      this.lowerHalfMaxHeap.push(plays)
    } else {
      this.upperHalfMinHeap.push(plays)
    }

    if (this.lowerHalfMaxHeap.size() > this.upperHalfMinHeap.size()) {
      this.upperHalfMinHeap.push(this.lowerHalfMaxHeap.pop())
    } else if (this.upperHalfMinHeap.size() > (this.lowerHalfMaxHeap.size() + 1)) {
      this.lowerHalfMaxHeap.push(this.upperHalfMinHeap.pop())
    }
  }

  isPopular(title) {
    const totalElements = this.lowerHalfMaxHeap.size() + this.upperHalfMinHeap.size()
    const isEven = totalElements % 2 === 0

    const currentSongPlays = this.songPlaysMap.get(title)

    if (isEven) {
      const median = (this.lowerHalfMaxHeap.top() + this.upperHalfMinHeap.top()) / 2
      return currentSongPlays > median
    } else {
      return currentSongPlays > this.upperHalfMinHeap.top()
    }
  }
}

const popularSongs = new PopularSongs()

popularSongs.registerPlays("boolean rhapsody", 193)
console.log(popularSongs.isPopular("boolean rhapsody"))
popularSongs.registerPlays("coding in the deep", 140)
popularSongs.registerPlays("all the single brackets", 132)
console.log(popularSongs.isPopular("boolean rhapsody"))
console.log(popularSongs.isPopular("coding in the deep"))
console.log(popularSongs.isPopular("all the single brackets"))
popularSongs.registerPlays("all about that base case", 291)
popularSongs.registerPlays("oops! I broke prod again", 274)
popularSongs.registerPlays("here comes the bug", 223)
console.log(popularSongs.isPopular("boolean rhapsody"))
console.log(popularSongs.isPopular("here comes the bug"))

console.log("// Test case 2: odd number of songs (5) -> median is the middle value (30)")
const oddTest = new PopularSongs()
oddTest.registerPlays("a", 10)
oddTest.registerPlays("b", 50)
oddTest.registerPlays("c", 30)
oddTest.registerPlays("d", 20)
oddTest.registerPlays("e", 40)

console.log(oddTest.isPopular("e")) // 40 > 30 -> true
console.log(oddTest.isPopular("a")) // 10 > 30 -> false

console.log("// Test case 3: even number of songs (4) -> median is the average of the two middle values (20)")
const evenTest = new PopularSongs()
evenTest.registerPlays("p", 5)
evenTest.registerPlays("q", 15)
evenTest.registerPlays("r", 25)
evenTest.registerPlays("s", 35)

console.log("// 35 > 20 -> true. Result:", evenTest.isPopular("s")) // 35 > 20 -> true
console.log("// 5 > 20 -> false. Result:", evenTest.isPopular("p")) // 5 > 20 -> false
