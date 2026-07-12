function build_adjacency_graph(v, edges) {
  const graph = Array.from({ length: v + 1 }, () => new Array())

  for (let [v1, v2] of edges) {
    graph[v1].push(v2)
    graph[v2].push(v1)
  }

  return graph
}

function adjacency_list_validation(v, graph) {
  for (let i=0; i<graph.length; i++) {
    const node = i;
    const seenNrb = new Set()
    for (const nrb of graph[node]) {
      if (nrb === node) return false
      if (nrb < 0 || nrb >= v) return false
      if (seenNrb.has(nrb)) return false
      if (!graph[nrb].some(e => e === node)) return false

      seenNrb.add(nrb)
    }
  }
  return true
}

const edges1 = [[0, 1], [1, 2], [1, 5], [1, 4], [2, 5], [2, 4], [4, 5]]
const graph1 = build_adjacency_graph(5, edges1)
console.log(adjacency_list_validation(5, graph1))

// self loop
const edges2 = [[0, 0], [1, 2], [1, 5], [1, 4], [2, 5], [2, 4], [4, 5]]
const graph2 = build_adjacency_graph(5, edges2)
console.log(adjacency_list_validation(5, graph2))

// parallel edge
const edges3 = [[0, 1], [1, 2], [1, 5], [1, 4], [2, 5], [2, 5], [2, 4], [4, 5]]
const graph3 = build_adjacency_graph(5, edges3)
console.log(adjacency_list_validation(5, graph3))

// invalid node index
const edges4 = [[0, 1], [1, 2], [1, 5], [1, 4], [2, 5], [2, 4], [4, 5]]
const graph4 = build_adjacency_graph(5, edges4)
graph4[2].push(50)
console.log(adjacency_list_validation(5, graph4))

// check if both nodes have edge
const edges5 = [[0, 1], [1, 2], [1, 5], [1, 4], [2, 5], [2, 4], [4, 5]]
const graph5 = build_adjacency_graph(5, edges5)
graph5[0].push(2)
console.log(adjacency_list_validation(5, graph5))

// check if both nodes have edge
const edges6 = [[0, 1]]
const graph6 = build_adjacency_graph(5, edges6)
console.log(adjacency_list_validation(5, graph6))


// from online material
console.log("\ntests from book\n")

// Example 1: graph = [[1], [0]]
// Output: True. This is a simple valid graph with two nodes connected by an edge.
console.log(adjacency_list_validation(2, [[1], [0]]))

// Example 2: graph = [[2], [0]]
// Output: False. Node index 2 is invalid since there are only 2 nodes.
console.log(adjacency_list_validation(2, [[2], [0]]))

// Example 3: graph = [[0], []]
// Output: False. Self-loop in node 0.
console.log(adjacency_list_validation(2, [[0], []]))

// Example 4: graph = [[1, 1], [0, 0]]
// Output: False. Parallel edges between nodes 0 and 1.
console.log(adjacency_list_validation(2, [[1, 1], [0, 0]]))

// Example 5: graph = [[1], []]
// Output: False. Node 0 has node 1 as a neighbor but not vice versa.
console.log(adjacency_list_validation(2, [[1], []]))
