#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    cin >> n >> m;
    vector<int> landingFee(n), takeoffFee(n);
    // airport = 0..n-1: ci[] comes first, then co[]
    for (int airport = 0; airport < n; airport++) cin >> landingFee[airport];
    for (int airport = 0; airport < n; airport++) cin >> takeoffFee[airport];

    // up to n*n - n flights: a matrix of one byte per pair is the natural store
    vector<vector<char>> hasFlight(n, vector<char>(n, 0));
    // flight = 0..m-1
    for (int flight = 0; flight < m; flight++) {
        int from, to;
        cin >> from >> to;
        hasFlight[from][to] = 1;
    }

    // A flight from -> to costs takeoffFee[from] + landingFee[to] > 0, so this
    // is a shortest-path problem with positive weights: Dijkstra. The graph
    // can be dense, so the O(n^2) array version beats a heap here.
    const long long UNREACHED = -1;
    vector<long long> cost(n, UNREACHED);
    vector<bool> finalized(n, false);
    cost[0] = 0;
    // round = 0..n-1: finalize the cheapest airport not finalized yet
    for (int round = 0; round < n; round++) {
        int cheapest = -1;
        // airport = 0..n-1: scan for the minimum
        for (int airport = 0; airport < n; airport++)
            if (!finalized[airport] && cost[airport] != UNREACHED
                && (cheapest == -1 || cost[airport] < cost[cheapest]))
                cheapest = airport;
        if (cheapest == -1) break;               // the rest cannot be reached
        finalized[cheapest] = true;
        // next = 0..n-1: relax every flight cheapest -> next
        for (int next = 0; next < n; next++) {
            if (!hasFlight[cheapest][next]) continue;
            long long through = cost[cheapest] + takeoffFee[cheapest] + landingFee[next];
            if (cost[next] == UNREACHED || through < cost[next]) cost[next] = through;
        }
    }

    // airport = 0..n-1 in order, -1 where unreachable
    for (int airport = 0; airport < n; airport++) cout << cost[airport] << (airport + 1 < n ? ' ' : '\n');
}
