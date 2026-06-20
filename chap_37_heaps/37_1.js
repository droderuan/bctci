class Heap {
  constructor(list, priorityFunction) {
    this.heap = list || new Array()
    this.priorityFunction = priorityFunction
    this.heapify()
  }

  heapify() {
    /**
     * No livro, é mencionado:
     * - At least half of the nodes are leaves,
     * - so we can start bubbling from the middle of array.
     * Isso acima provavelmente é verdade, pois a descrição do método heapify:
     * - All heapify does is bubbleDown all the non-leaf nodes, from bottom to top.
     * E em uma heap, é garantido que metade dos nós são folhas.
     */
    const halfHeap = Math.floor(this.size() / 2)

    for (let i = halfHeap; i >= 0; i--) {
      this.bubbleDown(i)
    }
  }

  size() {
    return this.heap.length
  }

  top() {
    if (!this.heap.length) {
      return null
    }
    return this.heap[0]
  }

  getNodeMetadata(idx) {
    const parent = idx > 0 ? Math.floor((idx - 1) / 2) : null
    const leftChild = (idx * 2) + 1
    const leftRight = (idx * 2) + 2

    return {
      idx: idx,
      value: this.heap[idx],
      parentIdx: parent,
      leftChildIdx: leftChild,
      rightChildIdx: leftRight
    }
  }

  swapNodes(parentIdx, childIdx) {
    const axu = this.heap[parentIdx]
    this.heap[parentIdx] = this.heap[childIdx]
    this.heap[childIdx] = axu
  }

  push(value) {
    let idxToPush = this.size()

    this.heap[idxToPush] = value

    this.bubbleUp(idxToPush)
  }

  bubbleUp(idx) {
    let currIdx = idx

    while (true) {
      if (currIdx === 0) {
        break
      }

      let node = this.getNodeMetadata(currIdx)
      let parent = this.getNodeMetadata(node.parentIdx)

      if (this.priorityFunction(node.value, parent.value)) {
        this.swapNodes(node.idx, parent.idx)
        currIdx = node.parentIdx
      } else {
        break
      }
    }
  }

  pop() {
    if (!this.heap.length) {
      return null
    }
    const rootNode = this.getNodeMetadata(0)

    let lastNode = this.size() - 1
    this.swapNodes(0, lastNode)

    this.heap.pop()

    this.bubbleDown(0)

    return rootNode.value
  }

  bubbleDown(idx) {
    let currIdx = idx
    const lastIdx = this.size() - 1

    while (true) {
      if (currIdx === lastIdx) {
        break
      }

      const node = this.getNodeMetadata(currIdx)

      const isLeaf = node.leftChildIdx >= this.size()

      if (isLeaf) {
        break
      }

      const left = this.getNodeMetadata(node.leftChildIdx)
      const right = this.getNodeMetadata(node.rightChildIdx)

      let childToSwap = left

      if (right.value && this.priorityFunction(right.value, left.value)) {
        childToSwap = right
      }

      /**
       * Nota: no livro, essa condicional é feita de forma inversa.
       * Aqui eu verifico se não devo trocar. -> this.priorityFunction(node.value, left.value)
       * No livro, é verificado se deve trocar. -> this.priorityFunction(left.value, node.value)
       * Isso me causou confusão
       */
      if (this.priorityFunction(node.value, childToSwap.value)) {
        break
      } else {
        this.swapNodes(node.idx, childToSwap.idx)
        currIdx = childToSwap.idx
      }
    }
  }

  log() {
    const bfs = new Array()
    bfs.push([0])

    let nextLevel = 0
    while (true) {
      const levelNodes = bfs[nextLevel]
      const newLevel = new Array()

      for (const node of levelNodes) {
        const nodeData = this.getNodeMetadata(node)
        if (nodeData.leftChildIdx > this.size()) {
          break
        }

        newLevel.push(nodeData.leftChildIdx)
        newLevel.push(nodeData.rightChildIdx)
      }

      if (newLevel.length > 0 || !newLevel.every(curr => curr === undefined)) {
        bfs.push(newLevel)
        nextLevel++
      } else {
        break
      }
    }
    const lineLength = this.size() * 2 * bfs.length

    for (let i= 0; i < bfs.length; i++) {
      const levels = bfs[i]
      const values = levels.map(curr => this.heap[curr])
      const distanceBetween = (lineLength / (values.length + 1)) - values.length
      values.unshift("")
      values.push("")
      console.log(values.join(" ".repeat(distanceBetween)))
    }
  }
}

const numbersList = [10, 2, 1, 80, 32, 9, 2, 8, 13, 24, 50, 5]

const minHeap = new Heap(numbersList, (a, b) => a < b)


console.log("heap before", "[", minHeap.heap.join(", "), "]")
console.log("top", minHeap.top())
console.log("heap after", "[", minHeap.heap.join(", "), "]")
console.log("\n\n")

console.log("heap before", "[", minHeap.heap.join(", "), "]")
console.log("pop", minHeap.pop())
console.log("heap after", "[", minHeap.heap.join(", "), "]")
console.log("\n\n")

console.log("heap before", "[", minHeap.heap.join(", "), "]")
console.log("pop", minHeap.pop())
console.log("heap after", "[", minHeap.heap.join(", "), "]")
console.log("\n\n")

console.log("heap before", "[", minHeap.heap.join(", "), "]")
console.log("push", 900)
minHeap.push(900)
console.log("heap after", "[", minHeap.heap.join(", "), "]")
console.log("\n\n")

console.log("heap before", "[", minHeap.heap.join(", "), "]")
console.log("push", -5)
minHeap.push(-5)
console.log("heap after", "[", minHeap.heap.join(", "), "]")
console.log("\n\n")


minHeap.log()
