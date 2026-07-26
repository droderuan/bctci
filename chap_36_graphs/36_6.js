function stronglyConnected(graph, visited) {
  function dfs(node, visited) {
    visited.add(node)
    let count = 1

    for (const nrb of graph[node]) {
      if (visited.has(nrb)) {
        continue
      }

      count += dfs(nrb, visited)
    }

    return count
  }

  for (let i=0; i<graph.length; i++) {
    const visited = new Set()
    const visitedNodeCount = dfs(i, visited)
    if (visitedNodeCount !== graph.length) {
      return false
    }
  }
  return true
}

function runTests() {
  const tests = [
    // Example strongly connected
    [[[1], [2], [0]], true],
    // Example not strongly connected
    [[[1], [2], []], false],
    // Single node
    [[[]], true],
    // Two nodes, strongly connected
    [[[1], [0]], true],
    // Two nodes, not strongly connected
    [[[1], []], false],
    // Cycle of 4 nodes
    [[[1], [2], [3], [0]], true],
    // Almost cycle of 4 nodes, missing one edge
    [[[1], [2], [3], []], false],
    // Complete graph
    [
      [
        [1, 2],
        [0, 2],
        [0, 1],
      ],
      true,
    ],
  ];
  for (const [graph, want] of tests) {
    const got = stronglyConnected(graph);
    console.log("want", want, "got", got)
    if (got !== want) {
      throw new Error(
        `\nstronglyConnected(${JSON.stringify(graph)}): got: ${got}, want: ${want}\n`,
      );
    }
  }
}

runTests();
