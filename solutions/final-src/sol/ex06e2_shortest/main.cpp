#include <iostream>
#include <vector>
using namespace std;

struct Edge { int a, b, c; };

int main() {
    int n, e, s;
    cin >> n >> e >> s;
    vector<Edge> E;
    int a, b, c;
    // read "a b c" until the input ends: same as reading E lines, and still
    // correct if the E on the first line does not match the real edge count
    while (cin >> a >> b >> c) E.push_back({a, b, c});

    // Step 1: is there a negative cycle ANYWHERE? (sample 2 has one that s cannot
    // even reach, and the answer is still -1.)  Start every vertex at 0, as if a
    // hidden source had a 0-edge to each of them, and run Bellman-Ford.
    vector<long long> h(n, 0);
    bool changed = true;
    // at most n rounds of relaxing every edge; stop early when nothing changes
    for (int round = 0; round < n && changed; round++) {
        changed = false;
        for (const Edge &x : E)
            if (h[x.a] + x.c < h[x.b]) { h[x.b] = h[x.a] + x.c; changed = true; }
    }
    if (changed) {            // still improving after n rounds -> a negative cycle exists
        cout << -1 << "\n";
        return 0;
    }

    // Step 2: ordinary Bellman-Ford from s. No negative cycle, so n-1 rounds suffice.
    const long long INF = 1e18;
    vector<long long> dist(n, INF);
    dist[s] = 0;
    // rounds 1 .. n-1: after round i, every shortest path of <= i edges is found
    for (int round = 1; round <= n - 1; round++) {
        bool any = false;
        for (const Edge &x : E)
            if (dist[x.a] != INF && dist[x.a] + x.c < dist[x.b]) { dist[x.b] = dist[x.a] + x.c; any = true; }
        if (!any) break;
    }
    // print vertex 0 .. n-1 (the PDF does not say what to print for an unreachable
    // vertex; we never saw one in the samples, see the "Traps" section)
    for (int v = 0; v < n; v++) {
        if (v > 0) cout << ' ';
        cout << dist[v];
    }
    cout << "\n";
}
