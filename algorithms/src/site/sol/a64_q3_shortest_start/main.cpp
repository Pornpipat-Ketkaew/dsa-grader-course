#include <iostream>
#include <vector>
using namespace std;

struct Edge {
    int from, to, weight;
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m, k, goal;
    cin >> n >> m >> k >> goal;
    // Weights can be negative (no negative cycle), so Dijkstra is out:
    // Bellman-Ford. Several possible starts = one imaginary source joined to
    // each start by a 0-weight edge, i.e. every start simply begins at 0.
    const long long UNREACHED = (long long)4e18;
    vector<long long> distance(n, UNREACHED);
    // index = 0..k-1: every allowed start begins at distance 0
    for (int index = 0; index < k; index++) {
        int start;
        cin >> start;
        distance[start] = 0;
    }
    vector<Edge> edges(m);
    // index = 0..m-1: read the directed edges
    for (int index = 0; index < m; index++) cin >> edges[index].from >> edges[index].to >> edges[index].weight;

    // round = 1..n-1: a shortest path has at most n-1 edges, and after round r
    // every path of at most r edges has been relaxed. Stop early when a full
    // round changes nothing: then nothing will ever change again.
    for (int round = 1; round < n; round++) {
        bool changed = false;
        // every edge once per round
        for (const Edge& edge : edges) {
            if (distance[edge.from] == UNREACHED) continue;
            long long through = distance[edge.from] + edge.weight;
            if (through < distance[edge.to]) {
                distance[edge.to] = through;
                changed = true;
            }
        }
        if (!changed) break;
    }
    cout << distance[goal] << '\n';
}
