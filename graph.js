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
  Dijkstra(start) {
    const extractMin = (Q, dist) => {
      let minDistNode = null,
        minDist = Infinity;
      for (let node in Q) {
        if (dist[node] < minDist) {
          minDist = dist[node];
          minDistNode = node;
        }
      }
      return minDistNode;
    };
    const Q = { ...this.edges },
      dist = {};
    for (let vertex in this.edges) {
      dist[vertex] = Infinity;
    }
    dist[start] = 0;
    while (Object.keys(Q).length) {
      const u = extractMin(Q, dist);
      delete Q[u];
      for (let adj in this.edges[u]) {
        const alt = dist[u] + this.edges[u][adj];
        if (alt < dist[adj]) dist[adj] = alt;
      }
    }
    return dist;
  }
}
// const graph = new Graph();
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

// graph.addVertex(1);
// graph.addVertex(2);
// graph.addVertex(3);
// graph.addVertex(4);
// graph.addVertex(5);
// graph.addVertex(6);
// graph.addEdge(1, 2);
// graph.addEdge(1, 3);
// graph.addEdge(2, 4);
// graph.addEdge(2, 5);
// graph.addEdge(3, 4);
// graph.addEdge(3, 4);
// graph.addEdge(3, 6);
// console.log(graph);
// console.log(graph.bfs(1));
// console.log(graph.dfs(1));
// const a = [
//   [1, 2, 1],
//   [2, 3, 3],
//   [5, 2, 2],
//   [1, 4, 2],
//   [5, 3, 1],
//   [5, 4, 2],
// ];
// for (let i = 1; i <= 5; i++) graph.addVertex(i);
// a.forEach((v) => {
//   graph.addEdge(v[0], v[1], v[2]);
// });
// console.log(graph);
// console.log(graph.Dijkstra(1));

const graph = [
    [0, 1, 1],
    [0, 2, 2],
    [1, 2, 5],
    [1, 3, 1],
    [2, 3, 8],
  ],
  n = 4;

class Kruskal {
  constructor(n, graph) {
    this.n = n;
    this.graph = graph.sort((a, b) => a[2] - b[2]);
  }
  findMST() {
    const getParent = (parent, v) => {
      if (parent[v] === v) return v;
      return getParent(parent, parent[v]);
    };
    const unionParent = (parent, a, b) => {
      a = getParent(parent, a);
      b = getParent(parent, b);
      a < b ? (parent[b] = a) : (parent[a] = b);
    };
    const findParent = (parent, a, b) => {
      return getParent(parent, a) === getParent(parent, b);
    };
    const arr = [];
    const parent = [
      ...new Set(this.graph.map((v) => [v[0], v[1]]).flat()),
    ].sort();
    let i = 0;
    console.log(parent);
    while (arr.length !== this.n - 1) {
      if (!findParent(parent, this.graph[i][0], this.graph[i][1])) {
        unionParent(parent, this.graph[i][0], this.graph[i][1]);
        arr.push(this.graph[i]);
      }
      i++;
    }
    return arr;
  }
}

const kruskal = new Kruskal(n, graph);
console.log(kruskal.findMST());
