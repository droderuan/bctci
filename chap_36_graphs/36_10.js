class Queue {
  constructor() {
    this.elements = new Array()
    this.head = 0
  }

  size() {
    return this.elements.length - this.head
  }

  push(element) {
    this.elements.push(element)
  }

  pop() {
    if (this.head === this.elements.length) {
      return undefined
    }
    const returnValue = this.elements[this.head]
    this.head++
    return returnValue
  }
}

// with path reconstruction
function shortestPathQueries(graph, start, queries) {
  const queue = new Queue()
  queue.push(start)
  const predecessors = new Map()
  predecessors.set(start, null)

  while (queue.size() > 0) {
    const node = queue.pop()

    for (let nrb of graph[node]) {
      if (predecessors.has(nrb)) {
        continue
      }

      predecessors.set(nrb, node)
      queue.push(nrb)
    }
  }

  const result = new Array()
  for (let query of queries) {
    if (!predecessors.has(query)) {
      result.push([])
    } else {
      //  const path = [node];
      //  while (path[path.length - 1] !== start) {
      //    path.push(predecessors.get(path[path.length - 1]));
      //  }
      let currentNode = query
      const path = new Array()
      while (path[path.length - 1] !== start) {
        path.push(currentNode)
        currentNode = predecessors.get(currentNode)
      }
      path.reverse()
      result.push(path)
    }
  }
  return result
}

// unoptimized
function shortestPathQueries1(graph, start, queries) {
  const queue = new Queue()
  queue.push(start)

  const visited = new Set()
  visited.add(start)
  const nodePath = new Array(graph.length).fill().map(() => [])
  nodePath[start] = [start]

  while (queue.size() > 0) {
    const node = queue.pop()

    for (let nrb of graph[node]) {
      if (visited.has(nrb)) {
        continue
      }
      visited.add(nrb)
      nodePath[nrb] = Array.from(nodePath[node])
      nodePath[nrb].push(nrb)
      queue.push(nrb)
    }
  }

  const result = new Array()

  for (let query of queries) {
    result.push(nodePath[query])
  }
  return result
}

function runTests() {
  const tests = [
    // Example
    [
      [[1], [0, 2, 5, 4], [1, 4, 5], [], [5, 2, 1], [1, 2, 4]],
      0,
      [1, 0, 3, 4],
      [[0, 1], [0], [], [0, 1, 4]],
    ],
    // Simple line graph
    [
      [[1], [0, 2], [1]],
      0,
      [1, 2],
      [
        [0, 1],
        [0, 1, 2],
      ],
    ],
    // Disconnected components
    [[[1], [0], [3], [2]], 0, [1, 2, 3], [[0, 1], [], []]],
    // Complete graph
    [
      [
        [1, 2],
        [0, 2],
        [0, 1],
      ],
      0,
      [1, 2],
      [
        [0, 1],
        [0, 2],
      ],
    ],
    // Single node
    [[[]], 0, [0], [[0]]],
    // Empty queries
    [[[1], [0]], 0, [], []],
  ];
  for (const [graph, start, queries, want] of tests) {
    const got = shortestPathQueries(graph, start, queries);
    console.log("want", want, "got", got)
    if (JSON.stringify(got) !== JSON.stringify(want)) {
      throw new Error(
        `\nshortestPathQueries(${JSON.stringify(graph)}, ${start}, ${JSON.stringify(queries)}): got: ${JSON.stringify(got)}, want: ${JSON.stringify(want)}\n`,
      );
    }
  }
}

runTests();
