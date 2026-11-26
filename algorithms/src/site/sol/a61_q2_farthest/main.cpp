#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    // roadLength[from][to] = length of the one-way road, -1 = no road (diagonal is 0)
    vector<vector<int>> roadLength(n, vector<int>(n));
    // from = 0..n-1, to = 0..n-1: read the adjacency matrix row by row
    for (int from = 0; from < n; from++)
        for (int to = 0; to < n; to++) cin >> roadLength[from][to];

    // Dijkstra from the capital (city 1 = index 0), array version: with a
    // matrix every city has n candidate roads anyway, so O(n^2) is optimal.
    const long long UNREACHED = -1;
    vector<long long> distance(n, UNREACHED);
    vector<bool> finalized(n, false);
    distance[0] = 0;
    // round = 0..n-1: each round finalizes one more city
    for (int round = 0; round < n; round++) {
        int closest = -1;
        // city = 0..n-1: pick the reached, not yet finalized city with the smallest distance
        for (int city = 0; city < n; city++)
            if (!finalized[city] && distance[city] != UNREACHED
                && (closest == -1 || distance[city] < distance[closest]))
                closest = city;
        if (closest == -1) break;            // every remaining city is unreachable
        finalized[closest] = true;
        // next = 0..n-1: relax every road closest -> next
        for (int next = 0; next < n; next++) {
            int length = roadLength[closest][next];
            if (length <= 0) continue;       // no road (-1) or the diagonal (0)
            long long through = distance[closest] + length;
            if (distance[next] == UNREACHED || through < distance[next]) distance[next] = through;
        }
    }

    long long farthest = 0;
    // city = 0..n-1: the answer is the largest distance, or -1 if any city is unreachable
    for (int city = 0; city < n; city++) {
        if (distance[city] == UNREACHED) {
            cout << -1 << '\n';
            return 0;
        }
        farthest = max(farthest, distance[city]);
    }
    cout << farthest << '\n';
}
