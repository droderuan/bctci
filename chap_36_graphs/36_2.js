function build_adjacency_graph(v, edges) {
  const graph = Array.from({ length: v + 1 }, () => new Array())

  for (let [v1, v2] of edges) {
    graph[v1].push(v2)
    graph[v2].push(v1)
  }

  return graph
}

function graph_path(graph, origin, target) {
  const visited = new Set()

  function visit(node, path = new Array()) {
    visited.add(node)
    path.push(node)

    if (node === target) {
      return true
    }

    for (let nrb of graph[node]) {
      if (visited.has(nrb)) continue
      const currentPath = visit(nrb, path)
      if(currentPath) return currentPath
    }
    path.pop()
    return false
  }

  const path = new Array()
  const foundPath = visit(origin, path)

  return path !== false ? path : []
}

const edges = [[0, 1], [4, 5], [1, 4], [1, 2], [1, 5], [2, 5], [2, 4]]
let graph = build_adjacency_graph(5, edges)

console.log(graph_path(graph, 0, 4))
console.log(graph_path(graph, 0, 3))
console.log(graph_path(graph, 4, 0))
console.log(graph_path(graph, 0, 0))

// from online material
console.log("\ntests from book\n")

// Example 1:
graph = [
  [1],
  [0, 2, 5, 4],
  [1, 4, 5],
  [],
  [5, 2, 1],
  [1, 2, 4]
]
node1 = 0
node2 = 4
console.log(graph_path(graph, node1, node2))
// Output: [0, 1, 4]
// There are other valid answers, like [0, 1, 2, 5, 4].

// Example 2:
graph = [
  [1],
  [0, 2, 5, 4],
  [1, 4, 5],
  [],
  [5, 2, 1],
  [1, 2, 4]
]
node1 = 0
node2 = 3
console.log(graph_path(graph, node1, node2))

// Output: []
// There is no path to node 3.

// Example 3:
graph = [
  [1],
  [0, 2],
  [1]
]
node1 = 0
node2 = 2
console.log(graph_path(graph, node1, node2))

// Output: [0, 1, 2]
// A simple path through all nodes.
