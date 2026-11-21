#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<long long> code(n);
    // read the code of every district 0 .. n-1
    for (int i = 0; i < n; i++) cin >> code[i];

    // MAXIMUM spanning tree of the complete graph where w(x, y) = x XOR y.
    // Prim's O(n^2) works unchanged if we always take the LARGEST connection.
    // We never store the n*n weights: w(u, v) is computed on the fly.
    vector<long long> best(n, -1);      // best[v] = largest edge from v into the tree, -1 = none yet
    vector<bool> inTree(n, false);
    best[0] = 0;
    unsigned long long total = 0;       // up to 1999 * (2^30 - 1): needs 64 bits
    // n rounds, one district joins the tree per round
    for (int round = 0; round < n; round++) {
        int u = -1;
        // choose the outside district with the most beautiful connection
        for (int v = 0; v < n; v++)
            if (!inTree[v] && (u == -1 || best[v] > best[u])) u = v;
        inTree[u] = true;
        total += best[u];
        // update every outside district with its road to u
        for (int v = 0; v < n; v++) {
            long long w = code[u] ^ code[v];
            if (!inTree[v] && w > best[v]) best[v] = w;
        }
    }
    cout << total << "\n";
}
