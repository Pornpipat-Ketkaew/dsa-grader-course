#include <cstdio>
#include <vector>
#include <queue>
using namespace std;

int main() {
    int n, m, k;
    if (scanf("%d %d %d", &n, &m, &k) != 3) return 0;
    vector<int> start(k);
    // the k servers attacked first
    for (int i = 0; i < k; i++) if (scanf("%d", &start[i]) != 1) return 0;
    vector<int> c(n);
    // c[i] = seconds needed to break into server i
    for (int i = 0; i < n; i++) if (scanf("%d", &c[i]) != 1) return 0;
    vector<vector<int>> adj(n);
    // the m cables (the PDF text says n-1 lines, but the samples have m lines)
    for (int i = 0; i < m; i++) {
        int a, b;
        if (scanf("%d %d", &a, &b) != 2) return 0;
        adj[a].push_back(b);
        adj[b].push_back(a);
    }
    // t[v] = earliest time server v is hacked.
    // An attacked-first server falls at time c[s]; from an infected u, a neighbour v
    // falls at t[u] + c[v]. That is Dijkstra where the cost sits on the VERTEX we enter.
    const int INF = 2e9;
    vector<int> t(n, INF);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> pq;
    // all k starting servers go into the heap together (multi-source)
    for (int i = 0; i < k; i++) {
        int s = start[i];
        if (c[s] < t[s]) { t[s] = c[s]; pq.push({t[s], s}); }
    }
    // pop servers in order of the time they are hacked
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > t[u]) continue;              // outdated entry
        // try to hack every neighbour from u
        for (int v : adj[u]) {
            if (d + c[v] < t[v]) {
                t[v] = d + c[v];
                pq.push({t[v], v});
            }
        }
    }
    int answer = 0;
    // all servers are hacked once the LAST one falls
    for (int v = 0; v < n; v++) if (t[v] > answer) answer = t[v];
    printf("%d\n", answer);
}
