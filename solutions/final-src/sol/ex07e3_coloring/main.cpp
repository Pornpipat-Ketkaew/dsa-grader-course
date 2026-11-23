#include <iostream>
#include <vector>
using namespace std;

int n, e;
bool adj[50][50];
int color[50];               // 0 = not coloured yet, otherwise 1..k
int usedBy[50][51];          // usedBy[v][c] = how many coloured neighbours of v have colour c
int satur[50];               // number of different colours among v's coloured neighbours
int deg[50];
int best;                    // fewest colours found so far

void setColor(int v, int c) {
    color[v] = c;
    // tell every neighbour of v that colour c is now next to it
    for (int u = 0; u < n; u++)
        if (adj[v][u] && usedBy[u][c]++ == 0) satur[u]++;
}
void unsetColor(int v) {
    int c = color[v];
    color[v] = 0;
    // take colour c back from every neighbour of v
    for (int u = 0; u < n; u++)
        if (adj[v][u] && --usedBy[u][c] == 0) satur[u]--;
}

// colored vertices so far, k = colours in use (always 1..k)
void solve(int colored, int k) {
    if (k >= best) return;                    // already as bad as the best: prune
    if (colored == n) { best = k; return; }
    // DSATUR: branch on the uncoloured vertex with the most distinct neighbour colours
    int v = -1;
    for (int u = 0; u < n; u++) {
        if (color[u]) continue;
        if (v == -1 || satur[u] > satur[v] || (satur[u] == satur[v] && deg[u] > deg[v])) v = u;
    }
    // try every colour already in use that no neighbour has
    for (int c = 1; c <= k; c++) {
        if (usedBy[v][c]) continue;
        setColor(v, c);
        solve(colored + 1, k);
        unsetColor(v);
    }
    // or open one new colour k+1 (all new colours are alike, so one try is enough)
    if (k + 1 < best) {
        setColor(v, k + 1);
        solve(colored + 1, k + 1);
        unsetColor(v);
    }
}

int main() {
    cin >> n >> e;
    // read the edges (ignore self-loops and repeats)
    for (int i = 0; i < e; i++) {
        int a, b;
        cin >> a >> b;
        if (a == b || adj[a][b]) continue;
        adj[a][b] = adj[b][a] = true;
        deg[a]++; deg[b]++;
    }
    best = n + 1;                             // n colours always work
    solve(0, 0);
    cout << best << "\n";
}
