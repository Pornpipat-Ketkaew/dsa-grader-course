#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false); cin.tie(0);
    int N, M, K;
    cin >> N >> M >> K;
    vector<vector<int>> adj(N + 1);
    // read the M roads
    for (int i = 0; i < M; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    // BFS from city 1; the first K cities it reaches are connected among themselves,
    // because each one was discovered from a city that was taken before it
    vector<bool> seen(N + 1, false);
    queue<int> q;
    q.push(1);
    seen[1] = true;
    int taken = 0;
    while (!q.empty() && taken < K) {
        int u = q.front(); q.pop();
        cout << u << (taken + 1 < K ? ' ' : '\n');
        taken++;
        // discover the neighbours of u
        for (int v : adj[u]) {
            if (!seen[v]) { seen[v] = true; q.push(v); }
        }
    }
}
