#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    // w[i][j] = cost of a cable between centres i and j (a complete graph)
    vector<vector<int>> w(n, vector<int>(n, 0));
    // line i (i = 0 .. n-2) holds the costs i-(i+1), i-(i+2), ..., i-(n-1)
    for (int i = 0; i < n - 1; i++) {
        for (int j = i + 1; j < n; j++) {
            cin >> w[i][j];
            w[j][i] = w[i][j];
        }
    }
    // Prim's algorithm, O(n^2) version (best for a dense graph):
    // grow one tree from centre 0; best[v] = cheapest cable from v into the tree.
    const int INF = 1e9;
    vector<int> best(n, INF);
    vector<bool> inTree(n, false);
    best[0] = 0;
    long long total = 0;
    // n rounds: each round adds exactly one centre to the tree
    for (int round = 0; round < n; round++) {
        int u = -1;
        // pick the centre outside the tree with the cheapest connection
        for (int v = 0; v < n; v++)
            if (!inTree[v] && (u == -1 || best[v] < best[u])) u = v;
        inTree[u] = true;
        total += best[u];
        // u is in the tree now: its cables may be cheaper connections for the others
        for (int v = 0; v < n; v++)
            if (!inTree[v] && w[u][v] < best[v]) best[v] = w[u][v];
    }
    cout << total << "\n";
}
