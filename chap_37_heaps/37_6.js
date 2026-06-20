import { Heap } from "./37_1.js"

// complexidade o(k * log n)
function mostListenedAcrossGenres(list, k) {
  const songList = new Array()

  // o(n), onde n = g * s, sendo g total de generos, s total de músicas
  for (let g = 0; g < list.length; g++) {
    const songs = list[g]

    for (let s = 0; s < songs.length; s++) {
      songList.push(songs[s])
    }
  }
  const result = new Array()

  // o(n)
  const maxHeap = new Heap(songList, (a, b) => a[1] > b[1])

  // o(k * log n)
  for (let i = 0; i < k; i++) {
    result.push(maxHeap.pop())
  }

  return result
}

const genres = [
  [["coding in the deep", 123], ["someone like GNU", 99], ["hello world", 98]], // pop
  [["ring of firewalls", 217]], // country
  [["boolean rhapsody", 184], ["merge together", 119], ["hey queue", 102]] // rock
]

console.log(mostListenedAcrossGenres(genres, 5).map(c => c[0]))

// minha implementação da ideia do livro
// complexidade o(k * log g), onde g é o total de generos
function mostListenedAcrossGenres2(list, k) {
  let genresWithPointers = new Array()

  for (let i = 0; i < list.length; i++) {
    genresWithPointers.push([i, 0])
  }

  const maxHeap = new Heap(
    genresWithPointers,
    (a, b) => {
      const musicA = list[a[0]][a[1]]
      const musicB =  list[b[0]][b[1]]
      return musicA[1] > musicB[1]
    }
  )
  const result = new Array()

  for (let i = 0; i < k; i++) {
    const [genreIdx, songIdx] = maxHeap.pop()

    result.push(list[genreIdx][songIdx][0])

    if(songIdx+1 < list[genreIdx].length) {
      maxHeap.push([genreIdx, songIdx+1])
    }
  }

  return result
}

console.log(mostListenedAcrossGenres2(genres, 5))
