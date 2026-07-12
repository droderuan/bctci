function build_adjacency_graph(v, edges) {
  const graph = Array.from({ length: v + 1 }, () => new Array())

  for (let [v1, v2] of edges) {
    graph[v1].push(v2)
    graph[v2].push(v1)
  }

  return graph
}

function graph_path(graph, origin, target) {
  const predecessors = {[target]: null}

  function visit(node) {
    for (const nrb of graph[node]) {
      if (nrb in predecessors) continue
      // ideia: cheguei em nrb através de node.
      predecessors[nrb] = node
      // Por isso o visit é chamado com target e não origin.
      // Podemos então perguntar "cheguei em origin através de qual nó?"
      // Busco origin pela key e não pelos valores das keys
      visit(nrb)
    }
  }

  visit(target)

  if(!(origin in predecessors)) return []

  const path = [origin]
  while (path[path.length -1] !== target) {
    const parent = predecessors[path[path.length -1]]
    path.push(parent)
  }
  return path
}

/**
 * PADRÕES DE MARCAÇÃO DE VISITADOS EM BUSCA DE GRAFOS
 *
 * Padrão A — marca na ENTRADA da função:
 *   visit(node) começa com visited.add(node).
 *
 * Padrão B — marca no AGENDAMENTO (antes de chamar/enfileirar):
 *   O chamador faz visited.add(nbr) antes de visit(nbr) / queue.push(nbr).
 *
 * Em DFS recursivo simples, A e B são equivalentes (mesmos nós, mesma ordem).
 *
 * Onde o padrão A QUEBRA:
 *   Em BFS ou DFS iterativo (fila/pilha explícita). Marcar só ao
 *   desenfileirar abre uma janela em que o mesmo nó é enfileirado por
 *   vários pais, inflando a fila (até O(V²) ou pior).
 *
 * Onde o padrão B é MAIS FORTE:
 *   1. BFS / iterativo: marcar ao agendar garante que cada nó entra na
 *      fila no máximo uma vez. É o único padrão correto nesses casos.
 *   2. Rastrear predecessores/arestas: no ponto da marcação você tem o
 *      par (pai, filho) de graça — ex: predecessors.set(nbr, node).
 *
 * Regra prática:
 *   - DFS recursivo puro → A (mais simples e seguro).
 *   - Fila/pilha explícita ou reconstrução de caminho → B (obrigatório/natural).
 *   - Default único para tudo → B, lembrando de marcar o nó inicial.
 */

// gera o array no caso base
function graph_path4(graph, origin, target) {
  const visited = new Set();

  function visit(node) {
    if (node === target) return [node];
    visited.add(node);

    for (const nbr of graph[node]) {
      if (visited.has(nbr)) continue;
      const rest = visit(nbr);
      if (rest) {
        rest.push(node); // O(1)
        return rest;
      }
    }
    return null;
  }

  return visit(origin)?.reverse() ?? [];
}

// versão muito interessante que gera uma lista encadeada. Não há array compartilhado
function graph_path3(graph, origin, target) {
  const visited = new Set();

  function visit(node) {
    if (node === target) return { value: node, next: null };
    visited.add(node);

    for (const nbr of graph[node]) {
      if (visited.has(nbr)) continue;
      const rest = visit(nbr);
      if (rest) return { value: node, next: rest }; // O(1), compartilha a cauda
    }
    return null;
  }

  const list = visit(origin);
  const path = [];
  for (let n = list; n !== null; n = n.next) path.push(n.value);
  return path;
}

// versão com spread
function graph_path2(graph, origin, target) {
  const visited = new Set()

  function visit(node, path = new Array()) {
    visited.add(node)
    if (node === target) {
      return [node]
    }

    for (let nrb of graph[node]) {
      if (visited.has(nrb)) continue
      const nrbPath = visit(nrb)
      if (nrbPath) return [node, ...nrbPath]
    }
    return null
  }

  return visit(origin) || []
}

//minha versão original, que achei confusa o retorno boolean e o array compartilhado
function graph_path1(graph, origin, target) {
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
      if (currentPath) return currentPath
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
// console.log(graph_path(graph, 0, 3))
// console.log(graph_path(graph, 4, 0))
// console.log(graph_path(graph, 0, 0))

// from online material
console.log("\ntests from book\n")

// Example 1:
graph = [
  [1],
  [0, 2, 5, 4],
  [1, 4, 5],
  [],
  [5, 2],
  [1, 2, 4]
]
node1 = 0
node2 = 4
console.log("Output: [0, 1, 4]", graph_path(graph, node1, node2))
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
console.log("Output: []", graph_path(graph, node1, node2))

//
// There is no path to node 3.

// Example 3:
graph = [
  [1],
  [0, 2],
  [1]
]
node1 = 0
node2 = 2
console.log("Output: [0, 1, 2]", graph_path(graph, node1, node2))
// A simple path through all nodes.
