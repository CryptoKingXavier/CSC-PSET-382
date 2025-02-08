class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}

class BST {
    constructor() {
        this.root = null
    }

    countNodes(node) {
        if (node === null) return 0
        return 1 + this.countNodes(node.left) + this.countNodes(node.right)
    }

    countEdges(node) {
        if (node === null) return 0
        return this.countNodes(node) - 1
    }

    findMax(node) {
        if (node === null) return Number.MIN_SAFE_INTEGER
        while (node.right !== null) {
            node = node.right
        }
        return node.data
    }

    findMin(node) {
        if (node === null) return Number.MAX_SAFE_INTEGER
        while (node.left !== null) {
            node = node.left
        }
        return node.data
    }
}

const tree = new BST()
tree.root = new Node(84)
tree.root.left = new Node(65)
tree.root.right = new Node(96)
tree.root.left.left = new Node(24)
tree.root.left.right = new Node(50)
tree.root.right.left = new Node(53)
tree.root.left.left.left = new Node(48)
tree.root.left.left.right = new Node(37)

// Count the number of nodes in a BST
console.log("Number of nodes:", tree.countNodes(tree.root))

// Count the number of edges in a BST
console.log()

// Find the maximum value in a BST
console.log("Maximum value:", tree.findMax(tree.root))

// Find the minimum value in a BST
console.log("Minimum value:", tree.findMin(tree.root))


// Store words in a BST and count occurrences
class WordNode {
    constructor(word) {
        this.word = word
        this.count = 1
        this.left = null
        this.right = null
    }
}

class WordBST {
    constructor() {
        this.root = null
    }

    insert(node, word) {
        if (node === null) return new WordNode(word)

        if (word < node.word) {
            node.left = this.insert(node.left, word)
        } else if (word > node.word) {
            node.right = this.insert(node.right, word)
        } else {
            node.count++
        }
        return node
    }

    inorder(node) {
        if (node !== null) {
            this.inorder(node.left)
            console.log(node.word + ": " + node.count)
            this.inorder(node.right)
        }
    }
}

const wordTree = new WordBST()
const text = "this is a test this is only a test"
const words = text.split(" ")

words.forEach((word) => {
    wordTree.root = wordTree.insert(wordTree.root, word)
})

console.log("Word counts in BST:")
wordTree.inorder(wordTree.root)