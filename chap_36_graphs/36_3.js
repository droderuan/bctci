function isTree(graph) {
  const predecessors = {}

  let acyclic = true
  function visit(node) {
    if (!acyclic) return
    for (let nrb of graph[node]) {
      if (nrb in predecessors){
        if (predecessors[node] !== nrb) {
          acyclic = false
        }
        continue
      }
      predecessors[nrb] = node
      visit(nrb)
    }
  }
  predecessors[0] = null
  visit(0)


  return acyclic && Object.keys(predecessors).length === graph.length
}

function runTests() {
  const tests = [
    // Example 1 from the book
    [[[2], [2, 5], [0, 1, 3, 4], [2], [2], [1]], true],
    // Example 2 from the book
    [[[2], [5], [0, 3], [2], [], [1]], false],
    // Example 3 from the book
    [[[1], [0, 2, 5], [1, 3, 4], [2], [2, 5], [1, 4]], false],
    // Single node
    [[[]], true],
    // Two nodes connected
    [[[1], [0]], true],
    // Two nodes disconnected
    [[[], []], false],
    // Line graph (valid tree)
    [[[1], [0, 2], [1, 3], [2]], true],
    // Cycle
    [[[1, 3], [2, 0], [3, 1], [0, 2]], false],
    // Complete graph K4 (not a tree)
    [[[1, 2, 3], [0, 2, 3], [0, 1, 3], [0, 1, 2]], false],
    // Star graph
    [[[1, 2, 3, 4], [0], [0], [0], [0]], true],
  ];
  for (const [graph, want] of tests) {
    const got = isTree(graph);
    console.log("want", want, "got", got, "graph", graph)
    if (got !== want) {
      throw new Error(
        `\nisTree(${JSON.stringify(graph)}): got: ${got}, want: ${want}\n`,
      );
    }
  }
}

runTests();
