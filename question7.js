// Tree Node class (can have multiple children)
class TreeNode {
    constructor(value) {
        this.value = value
        this.children = []   // Array to store child nodes
    }
}

// General Tree class
class GeneralTree {
    constructor(rootValue) {
        this.root = new TreeNode(rootValue)
    }

    // i. Insertion of a Node (Adds a child to a specified parent)
    insert(parentValue, newValue) {
        const parentNode = this.findNode(this.root, parentValue)
        if (parentValue) {
            parentNode.children.push(new TreeNode(newValue))
        } else {
            console.log(`Parent node ${parentValue} not found.`)
        }
    }

    // ii. Deletion of a Node (Removes a node and its subtree)
    delete(value) {
        if (this.root.value === value) {
            this.root = null   // Deleting the root makes tree empty
            return
        }
        this._deleteNode(this.root, value)
    }

    _deleteNode(node, value) {
        for (let i = 0; i < node.children.length; i++) {
            if (node.children[i].value === value) {
                node.children.splice(i, 1)
                return
            }
            this._deleteNode(node.children[i], value)
        }
    }

    // iv. Pre-order Traversal (Root -> Children)
    preOrder(node = this.root, result = []) {
        if (!node) return
        result.push(node.value)
        for (let child of node.children) {
            this.preOrder(child, result)
        }
        return result
    }

    // v. Post-order Traversal (Children -> Root)
    postOrder(node = this.root, result = []) {
        if (!node) return
        for (let child of node.children) {
            this.postOrder(child, result)
        }
        result.push(node.value)
        return result
    }

    // vi. In-order Traversal (Only meaningful for Binary Trees, so we pick first child -> Root -> Other children)
    inOrder(node = this.root, result = []) {
        if (!node) return
        if (node.children.length > 0) {
            this.inOrder(node.children[0], result)
        }
        result.push(node.value)
        for (let i = 1; i < node.children.length; i++) {
            this.inOrder(node.children[i], result)
        }
        return result
    }

    // vii. Breadth-First Search (Level-wise Traversal)
    breadthFirstSearch() {
        if (!this.root) return []
        let queue = [this.root]
        let result = []

        while (queue.length > 0) {
            let node = queue.shift()
            result.push(node.value)
            queue.push(...node.children)
        }
        return result
    }

    // viii. Depth-First Search (Uses Stack, explores deeply first)
    depthFirstSearch() {
        if (!this.root) return []
        let stack = [this.root]
        let result = []

        while (stack.length > 0) {
            let node = stack.pop()
            result.push(node.value)
            stack.push(...node.children.reverse())   // Reverse to maintain order
        }
        return result
    }

    // Helper function to find a node by value
    findNode(node, value) {
        if (!node) return null
        if (node.value === value) return node
        for (let child of node.children) {
            let found = this.findNode(child, value)
            if (found) return found
        }
        return null
    }
}

// Creating a general tree and testing the algorithms
const tree = new GeneralTree(84)   // Root node
tree.insert(84, 65)
tree.insert(84, 96)
tree.insert(65, 24)
tree.insert(65, 50)
tree.insert(96, 53)
tree.insert(24, 48)
tree.insert(24, 37)

console.log("Pre-order Traversal:", tree.preOrder())
console.log("Post-order Traversal:", tree.postOrder())
console.log("In-order Traversal:", tree.inOrder())
console.log("Breadth-First Search:", tree.breadthFirstSearch())
console.log("Depth-First Search:", tree.depthFirstSearch())

tree.delete(50)
console.log("After Deleting 50, Pre-order:", tree.preOrder())