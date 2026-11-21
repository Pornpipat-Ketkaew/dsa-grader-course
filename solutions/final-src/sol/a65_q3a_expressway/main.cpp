#include <cstdio>
#include <vector>
using namespace std;

int main() {
    int n, c12;
    if (scanf("%d %d", &n, &c12) != 2) return 0;
    // d[a][b] = cost between provinces a and b (1-based); INF = no road (yet)
    const int INF = 1e9;
    vector<vector<int>> d(n + 1, vector<int>(n + 1, INF));
    // a province is at distance 0 from itself
    for (int i = 1; i <= n; i++) d[i][i] = 0;
    d[1][2] = d[2][1] = c12;
    // year i = 3 .. n: read the k roads from province i to older provinces t < i
    for (int i = 3; i <= n; i++) {
        int k;
        if (scanf("%d", &k) != 1) return 0;
        for (int j = 0; j < k; j++) {
            int t, p;
            if (scanf("%d %d", &t, &p) != 2) return 0;
            if (p < d[i][t]) d[i][t] = d[t][i] = p;
        }
    }
    // Floyd-Warshall, adding provinces as "allowed stop-overs" in the order 1, 2, 3, ...
    // After phase k, d[a][b] = cheapest a->b route whose stop-overs are all <= k.
    // A 1->2 route with stop-overs <= k uses only provinces 1..k, which is exactly
    // the network that exists after year k. So after phase k, d[1][2] is year k's answer.
    // phases k = 1 .. n
    for (int k = 1; k <= n; k++) {
        // all pairs (a, b), a = 1..n, b = 1..n
        for (int a = 1; a <= n; a++) {
            int dak = d[a][k];
            if (dak == INF) continue;
            for (int b = 1; b <= n; b++)
                if (dak + d[k][b] < d[a][b]) d[a][b] = dak + d[k][b];
        }
        if (k >= 3) printf(k < n ? "%d " : "%d\n", d[1][2]);
    }
}
