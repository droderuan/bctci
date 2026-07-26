function highestAverageElevationGain(v, edges) {
  const graph = Array.from({ length: v }, () => new Array())

  for (const [nodeA, nodeB, height] of edges) {
    graph[nodeA].push([nodeB, height])
    graph[nodeB].push([nodeA, height])
  }

  const connectComponentMap = new Map()

  function dfs(node, id) {
    if (connectComponentMap.has(node)) return
    connectComponentMap.set(node, id)
    for (const nrb of graph[node]) {
      dfs(nrb[0], id)
    }
  }
  function getNodeAvgElevation(node) {
    if (graph[node].length === 0) {
      return 0
    }

    let nodeAbsElevation = 0

    for (const [nrb, height] of graph[node]) {
      nodeAbsElevation += height
    }

    const nodeAvgElevation = nodeAbsElevation / graph[node].length
    return nodeAvgElevation
  }

  let nextComponentId = 0

  for (let i = 0; i < graph.length; i++) {
    if (connectComponentMap.has(i)) continue
    dfs(i, nextComponentId)
    nextComponentId++
  }

  const components = Array.from({ length: nextComponentId }, () => [])

  for (const [nodeString, componentId] of connectComponentMap.entries()) {
    components[componentId].push(getNodeAvgElevation(Number(nodeString)))
  }

  let maxHillinessComponent = -Infinity

  for (const component of components) {
    let avgElevation = component.reduce((acc, curr) => acc + curr, 0)
    const componentAvgElevation = avgElevation / component.length
    maxHillinessComponent = Math.max(componentAvgElevation, maxHillinessComponent)
  }
  return maxHillinessComponent
}

function runTests() {
  const tests = [
    // Example from the book
    [
      4, // V
      [
        [0, 1, 3],
        [1, 2, 2],
        [2, 3, 1],
        [3, 0, 2],
      ], // edges
      2, // want
    ],
    // Single edge
    [2, [[0, 1, 5]], 5],
    // No edges
    [3, [], 0],
    // Multiple components
    [
      6,
      [
        [0, 1, 1],
        [1, 2, 2], // Component 1: avg 1.5
        [3, 4, 3],
        [4, 5, 5],
      ], // Component 2: avg 4.0
      4,
    ],
    // Single node component
    [
      3,
      [[0, 1, 2]], // Node 2 is isolated
      2,
    ],
  ];

  for (const [V, edges, want] of tests) {
    const got = highestAverageElevationGain(V, edges);
    console.log("want", want, "got", got)
    if (!(Math.abs(got - want) < 1e-6)) {
      throw new Error(
        `\nhighestAverageElevationGain(${V}, ${JSON.stringify(edges)}): got: ${got}, want: ${want}\n`,
      );
    }
  }
}

runTests();
