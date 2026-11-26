#include <iostream>
#include <vector>
using namespace std;

struct Edge {
    int from, to, weight;
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, e, source;
    cin >> n >> e >> source;
    vector<Edge> edges(e);
    // index = 0..e-1: read the directed edges
    for (int index = 0; index < e; index++) cin >> edges[index].from >> edges[index].to >> edges[index].weight;

    // Step 1: is there a negative cycle ANYWHERE? (Sample 2 answers -1 for a
    // cycle the source cannot even reach.) A hidden source with 0-weight edges
    // to every vertex reaches everything: start all potentials at 0.
    // Without a negative cycle, n - 1 rounds settle every value, so a change
    // in round n proves a negative cycle.
    vector<long long> potential(n, 0);
    bool changed = true;
    // round = 1..n, stopping early once a round changes nothing
    for (int round = 1; round <= n && changed; round++) {
        changed = false;
        for (const Edge& edge : edges)
            if (potential[edge.from] + edge.weight < potential[edge.to]) {
                potential[edge.to] = potential[edge.from] + edge.weight;
                changed = true;
            }
    }
    if (changed) {
        cout << -1 << '\n';
        return 0;
    }

    // Step 2: ordinary Bellman-Ford from the source; n - 1 rounds are enough.
    const long long UNREACHED = (long long)4e18;
    vector<long long> distance(n, UNREACHED);
    distance[source] = 0;
    // round = 1..n-1: after round r, every shortest path of at most r edges is known
    for (int round = 1; round < n; round++) {
        bool improved = false;
        for (const Edge& edge : edges) {
            if (distance[edge.from] == UNREACHED) continue;
            if (distance[edge.from] + edge.weight < distance[edge.to]) {
                distance[edge.to] = distance[edge.from] + edge.weight;
                improved = true;
            }
        }
        if (!improved) break;
    }
    // vertex = 0..n-1 in order
    for (int vertex = 0; vertex < n; vertex++) cout << distance[vertex] << (vertex + 1 < n ? ' ' : '\n');
}
