#include <cstdio>
#include <vector>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<vector<int>> adj(n);
    vector<int> deg(n, 0);
    // n nodes and n edges: a tree plus ONE extra edge, so exactly one cycle
    for (int i = 0; i < n; i++) {
        int x, y;
        if (scanf("%d %d", &x, &y) != 2) return 0;
        adj[x].push_back(y);
        adj[y].push_back(x);
        deg[x]++; deg[y]++;
    }
    // Peel leaves: a node of degree 1 cannot be on the cycle. Remove it, which may
    // turn its neighbour into a new leaf. Whatever survives is exactly the cycle.
    vector<int> leaves;
    vector<bool> removed(n, false);
    // collect the initial leaves 0..n-1
    for (int u = 0; u < n; u++)
        if (deg[u] == 1) leaves.push_back(u);
    int left = n;                            // nodes not removed yet
    // keep removing leaves until none are left
    while (!leaves.empty()) {
        int u = leaves.back(); leaves.pop_back();
        removed[u] = true;
        left--;
        // u's only remaining neighbour loses one degree
        for (int w : adj[u]) {
            if (removed[w]) continue;
            deg[w]--;
            if (deg[w] == 1) leaves.push_back(w);
        }
    }
    // the cycle has as many edges as nodes
    printf("%d\n", left);
}
