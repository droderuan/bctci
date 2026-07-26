function maxHilliness(graph, heights) {
  const connectComponentMap = new Map()

  function dfs(node, id) {
    if (connectComponentMap.has(node)) return
    connectComponentMap.set(node, id)
    for (const nrb of graph[node]) {
      dfs(nrb, id)
    }
  }

  function getNodeAvgElevation(node) {
    if(graph[node].length === 0) {
      return 0
    }

    let nodeAbsElevation = 0
    for (const nrb of graph[node]) {
      nodeAbsElevation += Math.abs(heights[node] - heights[nrb])
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
    // Example
    [
      [
        [1, 3],
        [0, 2],
        [1, 3],
        [0, 2],
      ],
      [4, 1, 3, 2],
      2,
    ],
    // Single node component
    [[[]], [5], 0],
    // Two disconnected components
    [[[1], [0], [3], [2]], [1.5, 5.5, 0.0, 5.0], 5],
    // All nodes same height
    [
      [
        [1, 2],
        [0, 2],
        [0, 1],
      ],
      [3, 3, 3],
      0,
    ],
    // Line graph
    [[[1], [0, 2], [1]], [1, 5, 2], 3.5],
    // Complete graph
    [
      [
        [1, 2, 3],
        [0, 2, 3],
        [0, 1, 3],
        [0, 1, 2],
      ],
      [1, 4, 7, 10],
      (3 + 6 + 9 + 3 + 6 + 3) / 6,
    ],
  ];
  for (const [graph, heights, want] of tests) {
    const got = maxHilliness(graph, heights);
    console.log("want", want, "got", got)
    if (!(Math.abs(got - want) < 0.0001)) {
      throw new Error(
        `\nmaxHilliness(${JSON.stringify(graph)}, ${JSON.stringify(heights)}): got: ${got}, want: ${want}\n`,
      );
    }
  }
}

runTests();
