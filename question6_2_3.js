const fs = require("fs")

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

    // Convert graph to JSON and save to a file
    saveToFile(filename) {
        const graphObject = Object.fromEntries(this.adjacencyList)
        fs.writeFileSync(filename, JSON.stringify(graphObject, null, 2), "utf8")
        console.log(`Graph saved to ${filename}`)
    }

    // Load graph from a JSON file
    static loadFromFile(filename) {
        const rawData = fs.readFileSync(filename, "utf8")
        const data = JSON.parse(rawData)
        let graph = new Graph()
        for (let vertex in data) {
            graph.adjacencyList.set(vertex, data[vertex])
        }
        console.log(`Graph loaded from ${filename}`)
        return graph
    }
}

// Create a graph and add vertices & edges
const graph = new Graph()
graph.addVertex("A")
graph.addVertex("B")
graph.addVertex("C")
graph.addEdge("A", "B")
graph.addEdge("A", "C")
graph.addEdge("B", "C")

// Save graph to a file
graph.saveToFile("graph.json")

// Load graph from file
const loadedGraph = Graph.loadFromFile("graph.json")
console.log(loadedGraph)
