function firstTimeAllConnected(V, cables) {
  function dfs(node, graph, visited) {
    for (const nrb of graph[node]) {
      if (visited.has(nrb)) continue
      visited.add(nrb)
      dfs(nrb, graph, visited)
    }
  }

  function isBefore(cableIndex) {
    const graph = Array.from({ length: V }, () => new Array())

    for (let i = 0; i <= cableIndex; i++) {
      const [cableA, cableB] = cables[i]
      graph[cableA].push(cableB)
      graph[cableB].push(cableA)
    }
    const visited = new Set([0])
    dfs(0, graph, visited)
    return visited.size < V
  }

  let left = 0
  let right = cables.length - 1

  if (isBefore(right)) {
    return -1
  }

  while (right - left > 1) {
    const mid = left + Math.floor((right-left) / 2)
    if (isBefore(mid)) {
      left = mid
    } else {
      right = mid
    }
  }
  return right
}

function runTests() {
  const tests = [
    // Case from picture - becomes connected after cables[2].
    [
      4,
      [
        [0, 2],
        [1, 3],
        [0, 1],
        [1, 2],
      ],
      2,
    ],
    // Edge case - never gets fully connected
    [3, [[0, 1]], -1],
    // Edge case - gets connected with final cable
    [
      3,
      [
        [0, 1],
        [1, 2],
      ],
      1,
    ],
    // Larger test case
    [
      5,
      [
        [0, 1],
        [2, 3],
        [1, 2],
        [3, 4],
        [0, 4],
      ],
      3,
    ],
    // Edge case - redundant cables don't affect result
    [
      4,
      [
        [0, 1],
        [1, 2],
        [2, 0],
        [2, 3],
        [3, 0],
      ],
      3,
    ],
    // No edges added.
    [4, [], -1],
    // One edge added.
    [4, [[0, 1]], -1],
  ];
  for (const [V, cables, want] of tests) {
    let got = firstTimeAllConnected(V, cables);
    console.log("want", want, "got", got)
    if (got !== want) {
      throw new Error(
        `\nfirstTimeAllConnected(${V}, ${JSON.stringify(cables)}): got: ${got}, want: ${want}\n`,
      );
    }
    // got = firstTimeAllConnectedUnionFind(V, cables);
    // if (got !== want) {
    //   throw new Error(
    //     `\nfirstTimeAllConnectedUnionFind(${V}, ${JSON.stringify(cables)}): got: ${got}, want: ${want}\n`,
    //   );
    // }
  }
}

runTests();
