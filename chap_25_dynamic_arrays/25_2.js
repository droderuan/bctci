// PROBLEM 25.1 IMPLEMENT DYNAMIC ARRAY

class DynamicArray {
  constructor(capacity=10) {
    this.arr = new Array(capacity)
    this.size = 0
    this.capacity = capacity
    this.initialDefinedCapacity = capacity
  }

  safeAppend() { // time complexity O(N)
    if(this.size+1 < this.capacity) {
      return
    }

    this.resizeArr(this.capacity * 2)
    return
  }

  resizeArr(newCapacity) { // time complexity O(N), where N is the size of current array
    const resizedArr = new Array(newCapacity)

    for (let i=0; i < this.size; i++) {
      resizedArr[i] = this.arr[i]
    }

    this.arr = resizedArr
    this.capacity = newCapacity
  }

  insert(index, value) {
    this.safeAppend()

    if(index>this.size) {
      throw new Error("Index out of range")
    }

    if(index === this.size) {
      this.append(value)
      return
    }
    let tempValue = value
    for (let i=index; i < this.size; i++) {
      const currentValue = this.arr[i]
      this.arr[i] = tempValue
      tempValue = currentValue
    }
    this.size++
  }

  append(value) { // time complexity O(N) | amortized complexity is O(1)
    this.safeAppend()

    this.arr[this.size] = value
    this.size++
  }

  contains(value) { // time complexity O(N)
    let contain = false
    for (let i=0; i<this.size; i++) {
      if(value === this.arr[i]){
        contain = true
        break
      }
    }
    return contain
  }

  get(index) { // time complexity O(1)
    if(index > this.capacity) {
      return null
    }

    return this.arr[index]
  }

  set(index, value) { // time complexity O(1)
    if(index > this.size) {
      throw new Error("Index out of range")
    }

    this.arr[index] = value
  }

  size() { // time complexity O(1)
    return this.size
  }

  safeDownsize() { // time complexity O(N)
    const usedCapacity = (this.size / this.capacity) * 100

    if(usedCapacity <= 25 && this.capacity > this.initialDefinedCapacity) {
      this.resizeArr(Math.floor(this.capacity / 2))
    }
    return
  }


  pop(index) { // time complexity O(N)
    if(index >= this.size) {
      throw new Error("Index out of range")
    }
    const removedElement = this.arr[index]
    for (let i=index; i<this.size; i++) {
      this.arr[i] = this.arr[i+1]
    }
    this.size--

    this.safeDownsize()

    return removedElement
  }

  pop_back() { // time complexity O(N) | amortized complexity is O(1)
    if(this.size === 0) {
      throw new Error("Attemp to remove from empty array")
    }
    this.arr[this.size] = null
    this.size--

    this.safeDownsize()
  }

  remove(value) { // time complexity O(N)
    let indexValue = -1
    for (let i=0; i<this.size; i++) {
      if(value === this.arr[i]){
        indexValue = i
        break
      }
    }

    if(indexValue === -1) {
      return -1
    }

    return this.pop(indexValue)
  }
}

const lengthTest = 10
const dynamicArr = new DynamicArray(lengthTest)

for (let num=0; num < lengthTest; num++) {
  dynamicArr.append(num)
}
console.log(dynamicArr.capacity, dynamicArr.size, dynamicArr.arr)

console.log("contains 5: ", dynamicArr.contains(5))
console.log("contains 15: ", dynamicArr.contains(15))

for (let num=0; num < lengthTest+5; num++) {
  dynamicArr.insert(num, num*10)
}

console.log("******** after insert ********")
console.log(dynamicArr.capacity, dynamicArr.size, dynamicArr.arr)


for (let num=15; num > 0; num--) {
  dynamicArr.pop(num)
}

console.log("******** after pop ********")
console.log(dynamicArr.capacity, dynamicArr.size, dynamicArr.arr)

console.log("******** after remove ********")
console.log("remove 5: ", dynamicArr.remove(5))
console.log(dynamicArr.capacity, dynamicArr.size, dynamicArr.arr)


