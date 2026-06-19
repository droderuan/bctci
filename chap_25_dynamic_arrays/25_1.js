// PROBLEM 25.1 IMPLEMENT DYNAMIC ARRAY

class DynamicArray {
  constructor(capacity=10) {
    this.arr = new Array(capacity)
    this.size = 0
    this.capacity = capacity
    this.initialDefinedCapacity = capacity
  }

  safeAppend() {
    if(this.size+1 < this.capacity) {
      return
    }

    this.resizeArr(this.capacity * 2)
    return
  }

  resizeArr(newCapacity) {
    const resizedArr = new Array(newCapacity)

    for (let i=0; i < this.size; i++) {
      resizedArr[i] = this.arr[i]
    }

    this.arr = resizedArr
    this.capacity = newCapacity
  }

  append(value) {
    this.safeAppend()

    this.arr[this.size] = value
    this.size++
  }

  get(index) {
    if(index > this.capacity) {
      return null
    }

    return this.arr[index]
  }

  set(index, value) {
    if(index > this.size) {
      throw new Error("Index out of range")
    }

    this.arr[index] = value
  }

  size() {
    return this.size
  }

  pop_back() {
    if(this.size === 0) {
      throw new Error("Attemp to remove from empty array")
    }
    this.arr[this.size] = null
    this.size--

    const usedCapacity = (this.size / this.capacity) * 100

    if(usedCapacity <= 25 && this.capacity > this.initialDefinedCapacity) {
      this.resizeArr(Math.floor(this.capacity / 2))
    }
  }
}

const lengthTest = 10
const dynamicArr = new DynamicArray(lengthTest)
console.log(dynamicArr.capacity, dynamicArr.size, dynamicArr.arr)

for (let num=0; num < lengthTest; num++) {
  dynamicArr.append(num)
}

console.log(dynamicArr.get(5))

console.log(dynamicArr.capacity, dynamicArr.size, dynamicArr.arr)


for (let num=0; num < lengthTest / 2; num++) {
  dynamicArr.pop_back()
}

console.log("******** after pop ********")
console.log(dynamicArr.capacity, dynamicArr.size, dynamicArr.arr)

