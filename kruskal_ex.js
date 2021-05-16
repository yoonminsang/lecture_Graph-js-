function solution(n, costs) {
  costs.sort((a, b) => a[2] - b[2]);
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
  const parent = Array(n)
    .fill()
    .map((_, i) => i);
  let i = 0;
  while (arr.length !== n - 1) {
    if (!findParent(parent, costs[i][0], costs[i][1])) {
      unionParent(parent, costs[i][0], costs[i][1]);
      arr.push(costs[i]);
    }
    i++;
  }
  return arr.reduce((acc, [from, to, weight]) => acc + weight, 0);
}
