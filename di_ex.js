class Graph {
  constructor() {
    this.edges = {};
  }
  addVertex(vertex) {
    this.edges[vertex] = {};
  }
  addEdge(vertex1, vertex2, weight = 0) {
    if (this.edges[vertex1] && this.edges[vertex1][vertex2] < weight) return;
    this.edges[vertex1][vertex2] = weight;
    this.edges[vertex2][vertex1] = weight;
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

function solution(N, road, K) {
  const graph = new Graph();
  for (let i = 1; i <= N; i++) {
    graph.addVertex(i);
  }
  road.forEach(([from, to, weight]) => {
    graph.addEdge(from, to, weight);
  });
  const di = graph.Dijkstra(1);
  return (
    Object.values(di).reduce((acc, cur) => {
      console.log(acc, cur);
      if (cur <= K) return acc + 1;
      return acc;
    }, 0) + 1
  );
}

console.log(
  solution(
    6,
    [
      [1, 2, 1],
      [1, 3, 2],
      [2, 3, 2],
      [3, 4, 3],
      [3, 5, 2],
      [3, 5, 3],
      [5, 6, 1],
    ],
    3
  )
);
