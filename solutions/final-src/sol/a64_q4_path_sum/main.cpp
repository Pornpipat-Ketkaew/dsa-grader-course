#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int n, m;
int K[8];
bool found[8];
int unanswered = 8;          // how many of the 8 queries are still "NO so far"
vector<pair<int, int>> adj[20];   // adj[u] = (v, w)
bool onPath[20];
int heaviest[20];            // heaviest[v] = weight of the heaviest edge touching v
int restMax = 0;             // sum of heaviest[v] over nodes NOT on the path:
                             // the path can never grow by more than this

// is there an open query K with lo <= K <= hi?
bool openIn(int lo, int hi) {
    // look at every query that is still open
    for (int q = 0; q < 8; q++)
        if (!found[q] && lo <= K[q] && K[q] <= hi) return true;
    return false;
}

// we are at node u, the simple path so far has weight sum
void dfs(int u, int sum) {
    if (!openIn(sum, sum + restMax)) return;  // no open query is reachable from here: prune
    // does this path answer any open query?
    for (int q = 0; q < 8; q++) {
        if (!found[q] && K[q] == sum) {
            found[q] = true;
            unanswered--;
        }
    }
    // extend the path by one edge to a node that is not on it yet
    for (int e = 0; e < (int)adj[u].size(); e++) {
        if (unanswered == 0) return;          // all 8 answered: stop everything
        int v = adj[u][e].first, w = adj[u][e].second;
        if (onPath[v]) continue;              // a simple path may not come back
        onPath[v] = true; restMax -= heaviest[v];
        dfs(v, sum + w);
        onPath[v] = false; restMax += heaviest[v];   // undo
    }
}

int main() {
    cin >> n >> m;
    // read the 8 queries
    for (int q = 0; q < 8; q++) cin >> K[q];
    // read the m undirected edges
    for (int i = 0; i < m; i++) {
        int a, b, w;
        cin >> a >> b >> w;
        adj[a].push_back({b, w});
        adj[b].push_back({a, w});
        heaviest[a] = max(heaviest[a], w);
        heaviest[b] = max(heaviest[b], w);
    }
    // at the start no node is on the path
    for (int v = 0; v < n; v++) restMax += heaviest[v];
    // a path may start anywhere: start one search from every node
    for (int s = 0; s < n && unanswered > 0; s++) {
        onPath[s] = true; restMax -= heaviest[s];
        dfs(s, 0);
        onPath[s] = false; restMax += heaviest[s];
    }
    // print the 8 answers in input order
    for (int q = 0; q < 8; q++) cout << (found[q] ? "YES" : "NO") << "\n";
}
