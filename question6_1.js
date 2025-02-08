class Graph {
    // Generates a graph as an adjacency list
    constructor() {
        this.adjacencyList = new Map()
    }

    // Adds a vertex to graph
    addVertex(vertex) {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, [])
        }
    }

    // Adds an edge to graph
    addEdge(vertex1, vertex2) {
        this.adjacencyList.get(vertex1).push(vertex2)
        this.adjacencyList.get(vertex2).push(vertex1)
    }

    // Implementing BFS algorithm
    bfs(start) {
        let queue = [start]
        let visited = new Set()
        visited.add(start)

        while (queue.length > 0) {
            let node = queue.shift()
            this.adjacencyList.get(node).forEach((neighbour) => {
                if (!visited.has(neighbour)) {
                    visited.add(neighbour)
                    queue.push(neighbour)
                }
            })
        }
    }

    // Implementing DFS algorithm
    dfs(start) {
        let stack = [start]
        let visited = new Set()
        visited.add(start)

        while (stack.length > 0) {
            let node = stack.pop()
            this.adjacencyList.get(node).forEach((neighbour) => {
                if (!visited.has(neighbour)) {
                    visited.add(neighbour)
                    stack.push(neighbour)
                }
            })
        }
    }
}

// Function to generate and test graphs of different sizes
const testGraphPerformance = () => {
    // Different graph sizes
    const sizes = [1_000, 5_000, 10_000, 20_000, 30_000, 40_000, 50_000]
    let results = []

    sizes.forEach((size) => {
        let graph = new Graph()

        // Add vertices
        for (let i = 0; i < size; i++) {
            graph.addVertex(i)
        }

        // Create random edges (approx. 2 * size edges)
        for (let i = 0; i < size * 2; i++) {
            let a = Math.floor(Math.random() * size)
            let b = Math.floor(Math.random() * size)
            if (a !== b) graph.addEdge(a, b)
        }
        console.log(`\nGraph Size: ${size}`)

        // Measure BFS time
        let startTime = performance.now()
        graph.bfs(0)
        let bfsTime = performance.now() - startTime
        console.log(`BFS Time: ${bfsTime.toFixed(4)}ms`)

        // Measure DFS time
        startTime = performance.now()
        graph.dfs(0)
        let dfsTime = performance.now() - startTime
        console.log(`DFS Time: ${dfsTime.toFixed(4)}ms`)

        // Store results
        results.push({ size, bfsTime, dfsTime })
    })

    // Log results for easy analysis
    console.table(results)
}

// Run performance test
testGraphPerformance()
