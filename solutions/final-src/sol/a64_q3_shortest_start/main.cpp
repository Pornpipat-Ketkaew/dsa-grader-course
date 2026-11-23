#include <iostream>
#include <vector>
using namespace std;

struct Edge { int a, b, w; };

int main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int n, m, k, v;
    cin >> n >> m >> k >> v;
    const long long INF = 1e18;
    vector<long long> dist(n, INF);
    // every start node gets distance 0: like one hidden source joined to all of them by 0-edges
    for (int i = 0; i < k; i++) {
        int s;
        cin >> s;
        dist[s] = 0;
    }
    vector<Edge> E(m);
    // read the m directed edges
    for (int i = 0; i < m; i++) cin >> E[i].a >> E[i].b >> E[i].w;

    // Bellman-Ford: at most n-1 rounds (paths have at most n-1 edges, no negative cycle)
    for (int round = 1; round <= n - 1; round++) {
        bool changed = false;
        // relax every edge once
        for (int i = 0; i < m; i++) {
            if (dist[E[i].a] == INF) continue;            // a is not reachable yet
            if (dist[E[i].a] + E[i].w < dist[E[i].b]) {
                dist[E[i].b] = dist[E[i].a] + E[i].w;
                changed = true;
            }
        }
        if (!changed) break;                  // nothing improved: distances are final
    }
    cout << dist[v] << "\n";
}
