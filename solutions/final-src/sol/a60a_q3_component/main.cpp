#include <iostream>
#include <vector>
using namespace std;

vector<vector<int>> adj;   // adj[u] = neighbours of u (nodes are 1..v)
vector<bool> seen;

// Depth-first search: mark every node reachable from u.
void dfs(int u) {
    seen[u] = true;
    // visit each neighbour w of u that we have not reached yet
    for (int w : adj[u])
        if (!seen[w]) dfs(w);
}

int main() {
    int v, e;
    cin >> v >> e;
    adj.assign(v + 1, {});
    seen.assign(v + 1, false);
    // read the e undirected edges; store each in BOTH directions
    for (int i = 0; i < e; i++) {
        int a, b;
        cin >> a >> b;
        adj[a].push_back(b);
        adj[b].push_back(a);
    }
    int components = 0;
    // nodes 1..v: every node not reached yet starts a brand-new component
    for (int u = 1; u <= v; u++) {
        if (!seen[u]) {
            components++;
            dfs(u);
        }
    }
    cout << components << "\n";
}
