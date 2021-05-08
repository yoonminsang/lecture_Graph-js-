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
  bfs(vertex) {
    const queue = [vertex];
    const visited = {};
    while (queue.length) {
      const currentNode = queue.shift();
      if (!visited[currentNode]) {
        visited[currentNode] = true;
        console.log(currentNode);
        for (let adj in this.edges[currentNode]) {
          queue.push(adj);
        }
      }
    }
  }
  dfs(vertex) {
    const dfsHelper = (vertex, visited) => {
      visited[vertex] = true;
      console.log(vertex);
      for (let adj in this.edges[vertex]) {
        if (!visited[adj]) dfsHelper(adj, visited);
      }
    };
    dfsHelper(vertex, {});
  }
}
const graph = new Graph();
// graph.addVertex(1);
// graph.addVertex(2);
// graph.addVertex(3);
// console.log(graph);
// graph.addEdge(1, 2);
// graph.addEdge(1, 3);
// console.log(graph);
// graph.removeEdge(1, 2);
// console.log(graph);
// graph.removeVertex(1);
// console.log(graph);
// Array(6)
//   .fill()
//   .map((_, i) => i + 1)
//   .forEach((v) => {
//     graph.addVertex(v);
//   });
graph.addVertex(1);
graph.addVertex(2);
graph.addVertex(3);
graph.addVertex(4);
graph.addVertex(5);
graph.addVertex(6);
graph.addEdge(1, 2);
graph.addEdge(1, 3);
graph.addEdge(2, 4);
graph.addEdge(2, 5);
graph.addEdge(3, 4);
graph.addEdge(3, 4);
graph.addEdge(3, 6);
console.log(graph);
// console.log(graph.bfs(1));
console.log(graph.dfs(1));
