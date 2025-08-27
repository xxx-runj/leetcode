function allPathsSourceTarget(graph) {
    const ans = [];
    const n = graph.length;
    dfs(graph, 0, [0])
    return ans;

    function dfs(graph, index, path) {
        if (index === n - 1) {
            // 到达了终点
            ans.push([...path]);
            return;
        }
        for(const i of graph[index]) {
            path.push(i)
            dfs(graph, i, path);
            path.pop();
        }
    }
}
allPathsSourceTarget([[1,2],[3],[3],[]])
