#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int n, e, K;
    cin >> n >> e >> K;
    vector<vector<int>> adj(n);
    // read the e friendships (undirected)
    for (int i = 0; i < e; i++) {
        int a, b;
        cin >> a >> b;
        adj[a].push_back(b);
        adj[b].push_back(a);
    }
    vector<int> dist(n);
    int best = 0;
    // one BFS from every student s = 0..n-1
    for (int s = 0; s < n; s++) {
        // dist = -1 means "not reached yet"
        for (int i = 0; i < n; i++) dist[i] = -1;
        queue<int> q;
        dist[s] = 0;
        q.push(s);
        int count = 0;                       // students within distance K (s itself included)
        // BFS pops nodes in order of distance 0, 1, 2, ...
        while (!q.empty()) {
            int u = q.front(); q.pop();
            count++;
            if (dist[u] == K) continue;      // do not expand further than K steps
            for (int w : adj[u]) {
                if (dist[w] == -1) {
                    dist[w] = dist[u] + 1;
                    q.push(w);
                }
            }
        }
        if (count > best) best = count;
    }
    cout << best << "\n";
}
