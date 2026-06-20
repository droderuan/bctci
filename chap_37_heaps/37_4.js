import { Heap } from "./37_1.js"

class TopSongs {
  constructor(k) {
    this.k = k
    this.minHeap = new Heap([], (a, b) => a[1] < b[1])
  }

  // complexidade o(2 * k * log k) -> o(k log k)
  registerPlays(title, plays) {
    const currentSongs = new Array()
    let inCurrentHeap = false

    const initialHeapSize = this.minHeap.size()

    for (let i = 0; i < initialHeapSize; i++) {
      const song = this.minHeap.pop()

      if (song[0] === title) {
        song[1] += plays
        inCurrentHeap = true
      }

      currentSongs.push(song)
    }

    if (!inCurrentHeap) {
      currentSongs.push([title, plays])
    }

    for (let i = 0; i < currentSongs.length; i++) {
      this.minHeap.push(currentSongs[i])
      if (this.minHeap.size() > this.k) {
        this.minHeap.pop()
      }
    }

  }

  // complexidade o(k)
  topK() {
    const songTitles = new Array()
    for (let i = 0; i < this.minHeap.size(); i++) {
      songTitles.push(this.minHeap.heap[i][0])
    }
    return songTitles
  }
}

const topSongs = new TopSongs(3)

topSongs.registerPlays("boolean rhapsody", 193)
topSongs.registerPlays("boolean rhapsody", 100)
topSongs.registerPlays("coding in the deep", 75)
topSongs.registerPlays("coding in the deep", 75)
topSongs.registerPlays("all about that base case", 200)
topSongs.registerPlays("all about that base case", 90)
topSongs.registerPlays("all about that base case", 1)
topSongs.registerPlays("here comes the bug", 223)
topSongs.registerPlays("oops! I broke prod again", 274)
topSongs.registerPlays("all the single brackets", 132)
console.log(topSongs.topK())

// Solução do livro
class TopSongsBook {
  constructor(k) {
    this.k = k
    this.maxHeap = new Heap([], (a, b) => a[1] > b[1])
    this.playsCounterMap = new Map()
  }

  // complexidade o(log n), onde n é o tamanho da heap
  registerPlays(title, plays) {
    let currentPlays = plays + (this.playsCounterMap.get(title) || 0)

    this.playsCounterMap.set(title, currentPlays)
    this.maxHeap.push([title, currentPlays])
  }

  // complexidade o(k+n*log n) -> o(nlog n)
  topK() {
    const songTitles = new Array()
    let getKCounter = Math.min(this.k, this.maxHeap.size())

    // worst case: todos os elementos são repetidos, fazendo rodar o .pop()
    // até limpar a heap. Complexidade o(n log n)
    // best case: complexidade o(k log n)
    // diria que a complexidade é o(n log n)
    while (getKCounter > 0 && this.maxHeap.size() > 0) {
      const song = this.maxHeap.pop()

      if (this.playsCounterMap.get(song[0]) === song[1]) {
        getKCounter--
        songTitles.push(song[0])
      }
    }

    //complexidade o(k log n)
    for (let i = 0; i < songTitles.length; i++) {
      this.maxHeap.push([songTitles[i], this.playsCounterMap.get(songTitles[i])])
    }

    return songTitles
  }
}

const topSongs2 = new TopSongsBook(3)

topSongs2.registerPlays("boolean rhapsody", 193)
topSongs2.registerPlays("boolean rhapsody", 100)
topSongs2.registerPlays("coding in the deep", 75)
topSongs2.registerPlays("coding in the deep", 75)
topSongs2.registerPlays("all about that base case", 200)
topSongs2.registerPlays("all about that base case", 90)
topSongs2.registerPlays("all about that base case", 1)
topSongs2.registerPlays("here comes the bug", 223)
topSongs2.registerPlays("oops! I broke prod again", 274)
topSongs2.registerPlays("all the single brackets", 132)
console.log(topSongs2.topK())
