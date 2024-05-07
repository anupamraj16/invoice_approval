export class Node<T> {
  data: T | null
  next: Node<T> | null
  constructor(data: T | null, next: Node<T> | null = null) {
    this.data = data
    this.next = next
  }
}

export class LinkedList<T> {
  head: Node<T> | null
  constructor() {
    this.head = null
  }

  size() {
    let counter = 0
    let node = this.head

    while (node) {
      counter++
      node = node.next
    }

    return counter
  }

  clear() {
    this.head = null
  }

  getAt(index: number) {
    let counter = 0
    let node = this.head
    // if LinkedList is empty, skip while loop
    while (node) {
      if (counter === index) {
        return node
      }
      counter++
      node = node.next
    }
    return null
  }

  removeAt(index: number) {
    if (!this.head) return null // LinkedList is empty

    if (index === 0) {
      this.head = this.head.next
      return
    }

    const previous = this.getAt(index - 1)
    if (!previous || !previous.next) return
    previous.next = previous.next.next
  }

  insertAt(data: any, index = 0) {
    if (!this.head) {
      this.head = new Node(data)
      return
    }
    if (index === 0) {
      this.head = new Node(data, this.head)
      return
    }

    // if index out of bound, insert at end
    const previous = this.getAt(index - 1) || this.getAt(this.size() - 1)
    if (previous)
      previous.next = new Node(data, previous.next)
  }

  forEach(fn: (node: Node<T>, counter: number) => any) {
    let node = this.head
    let counter = 0

    while (node) {
      fn(node, counter)
      counter++
      node = node.next
    }
  }

  // use LinkedList with for...of loop
  // for(let l of LL){// code to execute}
  *[Symbol.iterator]() {
    let node = this.head
    while (node) {
      yield node
      node = node.next
    }
  }
}