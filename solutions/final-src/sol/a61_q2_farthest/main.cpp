#include <cstdio>
#include <vector>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    // w[i][j] = length of the one-way road i -> j, or -1 if there is none
    vector<vector<int>> w(n, vector<int>(n));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            if (scanf("%d", &w[i][j]) != 1) return 0;

    // Dijkstra from city 1 (index 0), O(n^2) version for an adjacency matrix.
    const long long INF = 1e18;
    vector<long long> dist(n, INF);
    vector<bool> done(n, false);
    dist[0] = 0;
    // n rounds: each round finalises the closest city not finalised yet
    for (int round = 0; round < n; round++) {
        int u = -1;
        // scan all cities for the smallest tentative distance
        for (int v = 0; v < n; v++)
            if (!done[v] && dist[v] < INF && (u == -1 || dist[v] < dist[u])) u = v;
        if (u == -1) break;                  // the rest cannot be reached
        done[u] = true;
        // relax every road u -> v
        for (int v = 0; v < n; v++)
            if (w[u][v] > 0 && dist[u] + w[u][v] < dist[v]) dist[v] = dist[u] + w[u][v];
    }
    long long far = 0;
    // the answer: the largest distance, or -1 if some city is unreachable
    for (int v = 0; v < n; v++) {
        if (dist[v] == INF) { printf("-1\n"); return 0; }
        if (dist[v] > far) far = dist[v];
    }
    printf("%lld\n", far);
}
