import { Heap } from "./37_1.js"

// complexidade o(n * log a) espaço o(n)
function makePlaylist(songs) {
  const artistsSongs = new Map()

  // complexidade o(n)
  for (let i = 0; i < songs.length; i++) {
    const currentSong = songs[i];
    const currentArtistSongs = artistsSongs.get(currentSong[1]) || new Array()
    currentArtistSongs.push(currentSong[0])
    artistsSongs.set(currentSong[1], currentArtistSongs)
  }

  let lastUsedArtist = []
  let holdLastForOneInteration = false
  const listedArtistSongs = Array.from(artistsSongs)

  // complexidade o(n)
  const maxHeap = new Heap(listedArtistSongs, (a, b) => a[1].length > b[1].length)

  const result = new Array()

  // complexidade o(n * o(log a + log a)) -> o(n * log a)
  // sendo a o total de artistas e n total de músicas
  while (maxHeap.size() > 0) {
    const mostSongsArtist = maxHeap.pop()

    if (mostSongsArtist[0] === lastUsedArtist[0]) {
      if (maxHeap.size() === 0) {
        return []
      }
      holdLastForOneInteration = true
      continue
    } else {
      if (
        holdLastForOneInteration &&
        lastUsedArtist.length > 0 &&
        lastUsedArtist[1].length > 0
      ) {maxHeap.push(lastUsedArtist)} else {
        holdLastForOneInteration = false
      }
    }

    result.push([mostSongsArtist[1].pop(), mostSongsArtist[0]])

    if (mostSongsArtist[1].length > 0) {
      maxHeap.push(mostSongsArtist)
    }
    lastUsedArtist = mostSongsArtist
  }

  return result
}

const songs = [
  ["coding in the deep", "a dell"],
  ["hello world", "a dell"],
  ["someone like gnu", "a dell"],
  ["make you read my logs", "a dell"],
  ["hey queue", "the bugs"],
  ["here come the bug", "the bugs"],
  ["merge together", "the bugs"],
  ["dirty data", "michael json"],
  ["man in the middle attack", "michael json"],
  ["ring of firewalls", "johnny cache"],
]

console.log(makePlaylist(songs))

console.log("teste case 2: balanced artists (2 songs each) -> should interleave with no two consecutive same artist")
const balancedSongs = [
  ["song a1", "artist a"],
  ["song a2", "artist a"],
  ["song b1", "artist b"],
  ["song b2", "artist b"],
  ["song c1", "artist c"],
  ["song c2", "artist c"],
]
console.log(makePlaylist(balancedSongs))

console.log("teste case 3: one artist with way more songs than everyone else combined -> impossible, should return []")
const impossibleSongs = [
  ["song a1", "artist a"],
  ["song a2", "artist a"],
  ["song a3", "artist a"],
  ["song a4", "artist a"],
  ["song b1", "artist b"],
]
console.log(makePlaylist(impossibleSongs))
