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
      if (nrb < 0 || nrb > v) return false
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
