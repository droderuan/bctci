import { Heap } from "./37_1.js"

function k_most_played(songs, k) {
  const maxHeap = new Heap(songs, (a,b) => a[1] > b[1])

  const mostPlayedSongs = new Array()

  for (let i=0; i<k; i++) {
    mostPlayedSongs.push(maxHeap.pop()[0])
  }
  console.log(mostPlayedSongs)
}

function k_most_played_with_space_constrain(songs, k) {
  /**
   * como vamos limitar o espaço com o .pop(),
   * precisamos garantir que não estamos removendo um elemento
   * candidato a retorno. Se criarmos uma minHeap, sabemos que
   * a raiz será a música com menor quantia de execuções.
   */
  const minHeap = new Heap([], (a,b) => a[1] < b[1])

  for (let i=0; i < songs.length; i++) {
    minHeap.push(songs[i])

    if(minHeap.size() > k) {
      minHeap.pop()
    }
  }

  console.log(minHeap.heap.map(curr => curr[0]))
}

const songs = [
  ["all the single brackets", 132],
  ["oops! I broke prod again", 274],
  ["coding in the deep", 146],
  ["boolean rhapsody", 193],
  ["here comes the bug", 291],
  ["all about that base case", 291]
]

k_most_played(songs, 3)
k_most_played_with_space_constrain(songs, 3)
