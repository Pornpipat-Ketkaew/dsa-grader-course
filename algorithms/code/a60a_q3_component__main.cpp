#include <iostream>
#include <vector>
using namespace std;

vector<vector<int>> neighbors;   // neighbors[node] = adjacent nodes (1..v)
vector<bool> visited;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int v, e;
    cin >> v >> e;
    neighbors.resize(v + 1);
    visited.assign(v + 1, false);
    // edge = 0..e-1: an undirected edge is stored in both directions
    for (int edge = 0; edge < e; edge++) {
        int a, b;
        cin >> a >> b;
        neighbors[a].push_back(b);
        neighbors[b].push_back(a);
    }

    int components = 0;
    vector<int> stack;
    // start = 1..v (upward): a node not visited yet belongs to a component
    // nobody has explored, so it starts a new one; the DFS then marks the
    // whole component so none of its nodes can start another
    for (int start = 1; start <= v; start++) {
        if (visited[start]) continue;
        components++;
        visited[start] = true;
        stack.push_back(start);
        // iterative DFS: pop a node, push its unvisited neighbours
        // (marked when pushed, so each node enters the stack once)
        while (!stack.empty()) {
            int node = stack.back();
            stack.pop_back();
            for (int next : neighbors[node])
                if (!visited[next]) {
                    visited[next] = true;
                    stack.push_back(next);
                }
        }
    }
    cout << components << "\n";
}
