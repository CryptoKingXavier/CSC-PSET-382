// Binary Search Tree Node
class TreeNode {
    constructor(value) {
        this.value = value
        this.left = null   // Left subtree
        this.right = null   // Right subtree
    }
}

// Binary Search Tree Class
class BinarySearchTree {
    constructor() {
        this.root = null   // Initially empty tree
    }

    // Insert a new value into the BST
    insert(value) {
        const newNode = new TreeNode(value)
        if (!this.root) {
            this.root = newNode
            return
        }

        let current = this.root
        while (true) {
            if (value < current.value) {
                if (!current.left) {
                    current.left = newNode
                    return
                }
                current = current.left
            } else {
                if (!current.right) {
                    current.right = newNode
                    return
                }
                current = current.right
            }
        }
    }

    // Search for a value in the BST
    search(value) {
        let current = this.root
        while (current) {
            if (value === current.value) return true
            current = value < current.value ? current.left : current.right
        }
        return false
    }

    // In-order Traversal (Left -> Root -> Right)
    inOrder(node = this.root, result = []) {
        if (!node) return
        this.inOrder(node.left, result)
        result.push(node.value)
        this.inOrder(node.right, result)
        return result
    }

    // Pre-order Traversal (Root -> Left -> Right)
    preOrder(node = this.root, result = []) {
        if (!node) return
        result.push(node.value)
        this.preOrder(node.left, result)
        this.preOrder(node.right, result)
        return result
    }

    // Post-order Traversal (Left -> Right -> Root)
    postOrder(node = this.root, result = []) {
        if (!node) return
        this.postOrder(node.left, result)
        this.postOrder(node.right, result)
        result.push(node.value)
        return result
    }

    // Breadth-First Search (Level Order Traversal)
    breadthFirstSearch() {
        if (!this.root) return []
        let queue = [this.root]
        let result = []

        while (queue.length) {
            let node = queue.shift()
            result.push(node.value)
            if (node.left) queue.push(node.left)
            if (node.right) queue.push(node.right)
        }
        return result
    }

    // Depth-First Search (Iterative using Stack)
    depthFirstSearch() {
        if (!this.root) return []
        let stack = [this.root]
        let result = []

        while (stack.length) {
            let node = stack.pop()
            result.push(node.value)
            if (node.right) stack.push(node.right)
            if (node.left) stack.push(node.left)
        }
        return result
    }
}

// Example usage
const bst = new BinarySearchTree()
bst.insert(84)
bst.insert(65)
bst.insert(96)
bst.insert(24)
bst.insert(50)
bst.insert(53)
bst.insert(48)
bst.insert(37)

console.log("In-order Traversal:", bst.inOrder())
console.log("Pre-order Traversal:", bst.preOrder())
console.log("Post-order Traversal:", bst.postOrder())
console.log("Breadth-First Search:", bst.breadthFirstSearch())
console.log("Depth-First Search:", bst.depthFirstSearch())

console.log("Search 50:", bst.search(50))
console.log("Search 100:", bst.search(100))