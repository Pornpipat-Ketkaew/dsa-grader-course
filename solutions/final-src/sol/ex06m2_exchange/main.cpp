#include <cstdio>
#include <cmath>
#include <vector>
using namespace std;

int n;
vector<int> par;   // par[v] = the currency we last improved v from (-1 = none)

// Does the "parent graph" (v -> par[v]) contain a cycle?
// With strict improvements, a cycle there can only be a negative cycle.
bool parentCycle() {
    vector<int> state(n, 0);   // 0 = unvisited, 1 = on the current walk, 2 = finished
    // start a walk from every currency v = 0 .. n-1
    for (int v = 0; v < n; v++) {
        if (state[v]) continue;
        int x = v;
        // follow parent pointers while they lead somewhere new
        while (x != -1 && state[x] == 0) { state[x] = 1; x = par[x]; }
        if (x != -1 && state[x] == 1) return true;     // walked back into this walk: a loop
        // mark this walk finished: v, par[v], ... up to where we stopped
        x = v;
        while (x != -1 && state[x] == 1) { state[x] = 2; x = par[x]; }
    }
    return false;
}

int main() {
    int K;
    if (scanf("%d", &K) != 1) return 0;
    // the K tables are independent
    for (int t = 0; t < K; t++) {
        if (scanf("%d", &n) != 1) return 0;
        // Money MULTIPLIES along a route: 1 unit of a becomes R[a][b] units of b.
        // With w = -log(R), products turn into sums, and
        //     product > 1   <=>   sum of log(R) > 0   <=>   sum of w < 0.
        // So "infinite money" is exactly a NEGATIVE CYCLE for the weights w.
        vector<vector<double>> w(n, vector<double>(n));
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++) {
                double r;
                if (scanf("%lf", &r) != 1) return 0;
                w[i][j] = (r > 0) ? -log(r) : INFINITY;   // a rate of 0 = no exchange at all
            }
        // Bellman-Ford from a hidden source joined to every currency with weight 0:
        // start all h[v] = 0, then relax every pair (u, v) round after round.
        const double EPS = 1e-12;            // ignore improvements smaller than rounding noise
        vector<double> h(n, 0.0);
        par.assign(n, -1);
        bool profit = false;
        // at most n rounds; stop early if nothing changes (no cycle) or a cycle is seen
        for (int round = 1; round <= n; round++) {
            bool changed = false;
            // every ordered pair: u = 0..n-1, v = 0..n-1
            for (int u = 0; u < n; u++)
                for (int v = 0; v < n; v++)
                    if (h[u] + w[u][v] < h[v] - EPS) {
                        h[v] = h[u] + w[u][v];
                        par[v] = u;
                        changed = true;
                    }
            if (!changed) break;                         // converged: no negative cycle
            if (round == n || parentCycle()) { profit = true; break; }
        }
        printf(profit ? "YES\n" : "NO\n");
    }
}
