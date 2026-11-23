#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int N, M, K;
    cin >> N >> M >> K;
    vector<bool> closed(N + 1, false);
    // read the K closed cities
    for (int i = 0; i < K; i++) {
        int c;
        cin >> c;
        closed[c] = true;
    }
    vector<vector<pair<int, int>>> adj(N + 1);
    // read the M undirected roads; a road that touches a closed city can never be used
    for (int i = 0; i < M; i++) {
        int a, b, c;
        cin >> a >> b >> c;
        if (closed[a] || closed[b]) continue;
        adj[a].push_back({b, c});
        adj[b].push_back({a, c});
    }
    // ordinary Dijkstra from city 1 on what is left
    const long long INF = 1e18;
    vector<long long> dist(N + 1, INF);
    priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<>> pq;
    dist[1] = 0;
    pq.push({0, 1});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;            // an old, longer entry
        if (u == N) break;                    // N is final the moment it leaves the queue
        // relax every open road out of u
        for (auto [v, c] : adj[u]) {
            if (d + c < dist[v]) { dist[v] = d + c; pq.push({dist[v], v}); }
        }
    }
    cout << dist[N] << "\n";
}
