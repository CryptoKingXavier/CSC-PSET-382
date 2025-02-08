class Graph {
    constructor() {
        this.adjacencyList = new Map()
    }

    addVertex(vertex) {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, [])
        }
    }

    addEdge(vertex1, vertex2) {
        this.adjacencyList.get(vertex1).push(vertex2)
        this.adjacencyList.get(vertex2).push(vertex1)
    }

    dfs(start) {
        let stack = [start]
        let visited = new Set()
        let result = []

        while (stack.length > 0) {
            let node = stack.pop()
            if (!visited.has(node)) {
                visited.add(node)
                result.push(node)
                let neighbors = this.adjacencyList.get(node) || []
                stack.push(...neighbors.reverse())
            }
        }
        return result
    }

    bfs(start) {
        let queue = [start]
        let visited = new Set()
        let result = []

        while (queue.length > 0) {
            let node = queue.shift()
            if (!visited.has(node)) {
                visited.add(node)
                result.push(node)
                let neighbors = this.adjacencyList.get(node) || []
                queue.push(...neighbors)
            }
        }
        return result
    }
}

// Create the graph from the image
const graph = new Graph()
const nodes = [84, 65, 96, 24, 50, 53, 48, 37]
nodes.forEach((node) => graph.addVertex(node))

graph.addEdge(84, 65)
graph.addEdge(84, 96)
graph.addEdge(65, 24)
graph.addEdge(65, 50)
graph.addEdge(96, 53)
graph.addEdge(24, 48)
graph.addEdge(24, 37)

// Perform DFS and BFS
console.log("Depth-First Search (DFS):", graph.dfs(84))
console.log("Breadth-First Search (BFS):", graph.bfs(84))
console.log(graph.adjacencyList)