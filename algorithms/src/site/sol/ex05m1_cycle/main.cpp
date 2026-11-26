#include <iostream>
#include <vector>
using namespace std;

// BFS over one graph. In a BFS tree every node except a root has exactly one
// tree edge to its parent. When node u looks at a neighbour w that is already
// discovered and w is not u's parent, the edge u-w is not a tree edge: there
// are now two different paths between u and w, which means a cycle.
bool hasCycle(int n, const vector<vector<int>>& neighbors) {
    vector<int> parent(n, -2);          // -2 = not discovered, -1 = BFS root
    vector<int> queue;
    queue.reserve(n);
    // start = 0..n-1: every undiscovered vertex roots a BFS of its component
    for (int start = 0; start < n; start++) {
        if (parent[start] != -2) continue;
        parent[start] = -1;
        queue.push_back(start);
        // read moves forward through the queue array while write (push_back) appends
        for (size_t read = queue.size() - 1; read < queue.size(); read++) {
            int u = queue[read];
            for (int w : neighbors[u]) {
                if (parent[w] == -2) {          // tree edge: discover w through u
                    parent[w] = u;
                    queue.push_back(w);
                } else if (w != parent[u]) {
                    return true;                // non-tree edge closes a cycle
                }
            }
        }
    }
    return false;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int graphs;
    cin >> graphs;
    // graph = 0..T-1: answer each graph in input order
    for (int graph = 0; graph < graphs; graph++) {
        int n, e;
        cin >> n >> e;
        vector<vector<int>> neighbors(n);
        // edge = 0..e-1: read every edge (even if a cycle is obvious early,
        // the next graph starts after the last one)
        for (int edge = 0; edge < e; edge++) {
            int a, b;
            cin >> a >> b;
            neighbors[a].push_back(b);
            neighbors[b].push_back(a);
        }
        cout << (hasCycle(n, neighbors) ? "YES" : "NO") << '\n';
    }
}
