import { Heap } from "./37_1.js"

class TopSongs {
  constructor(k) {
    this.k = k
    this.minHeap = new Heap([], (a, b) => a[1] < b[1])
  }

  registerPlays(title, plays) {
    this.minHeap.push([title, plays])

    if (this.minHeap.size() > this.k) {
      this.minHeap.pop()
    }
  }

  // Complexidade o(n)
  topK() {
    const songTitles = new Array()
    for (let i = 0; i < this.minHeap.size(); i++) {
      songTitles.push(this.minHeap.heap[i][0])
    }
    return songTitles
  }

  /**
   *  minha solução não está aproveitando a vantagem da heap com tamanho limitado
   *                  .pop()       .push()
   *  Complexidade o(k * o(log k) + k * o(log k) ) -> o(k * log k)
   *  log de k, pois estou mantendo apenas k elementos.
   */
  topK2() {
    const songsToPush = new Array()
    const elementsToTake = Math.min(this.k, this.minHeap.size())

    for (let i = 0; i < elementsToTake; i++) {
      const song = this.minHeap.pop()
      songsToPush.push(song)
    }

    const songTitles = new Array()
    for (let i = 0; i < songsToPush.length; i++) {
      this.minHeap.push(songsToPush[i])
      songTitles.push(songsToPush[i][0])
    }

    return songTitles
  }
}

const songs = [
  ["all the single brackets", 132],
  ["oops! I broke prod again", 274],
  ["coding in the deep", 146],
  ["boolean rhapsody", 193],
  ["here comes the bug", 291],
  ["all about that base case", 291]
]

const topSongs = new TopSongs(3)

topSongs.registerPlays("boolean rhapsody", 193)
topSongs.registerPlays("coding in the deep", 146)
console.log(topSongs.topK())
topSongs.registerPlays("all about that base case", 291)
topSongs.registerPlays("here comes the bug", 291)
topSongs.registerPlays("oops! I broke prod again", 274)
topSongs.registerPlays("all the single brackets", 132)
console.log(topSongs.topK())

