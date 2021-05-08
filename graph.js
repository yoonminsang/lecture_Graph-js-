class Graph {
  constructor() {
    this.edges = {};
  }
  addVertex(vertex) {
    this.edges[vertex] = {};
  }
  addEdge(vertex1, vertex2, weight = 0) {
    this.edges[vertex1][vertex2] = weight;
    this.edges[vertex2][vertex1] = weight;
  }
  removeVertex(vertex) {
    delete this.edges[vertex];
    for (let v in this.edges) {
      for (let n in this.edges[v]) {
        if (n == vertex) delete this.edges[v][n];
      }
    }
  }
  removeEdge(vertex1, vertex2) {
    delete this.edges[vertex1][vertex2];
    delete this.edges[vertex2][vertex1];
  }
}
const graph = new Graph();
graph.addVertex(1);
graph.addVertex(2);
graph.addVertex(3);
console.log(graph);
graph.addEdge(1, 2);
graph.addEdge(1, 3);
console.log(graph);
graph.removeEdge(1, 2);
console.log(graph);
graph.removeVertex(1);
console.log(graph);
