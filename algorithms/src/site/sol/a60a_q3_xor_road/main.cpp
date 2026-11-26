#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    vector<int> code(n);
    // district = 0..n-1
    for (int district = 0; district < n; district++) cin >> code[district];

    // MAXIMUM spanning tree of the complete graph with weight(x, y) = code[x] XOR code[y].
    // Prim works the same way with "largest" instead of "smallest" (negate every
    // weight and it is an ordinary minimum spanning tree). The n*n weights are
    // never stored: each one is computed when needed.
    vector<long long> bestLink(n, -1);      // largest road from v into the tree, -1 = none yet
    vector<bool> inTree(n, false);
    bestLink[0] = 0;
    unsigned long long total = 0;           // up to 1999 * (2^30 - 1): needs 64 bits
    // round = 0..n-1: one district joins the tree per round
    for (int round = 0; round < n; round++) {
        int next = -1;
        // district = 0..n-1: choose the outside district with the most beautiful link
        for (int district = 0; district < n; district++)
            if (!inTree[district] && (next == -1 || bestLink[district] > bestLink[next])) next = district;
        inTree[next] = true;
        total += bestLink[next];
        // district = 0..n-1: a road to "next" may be a better link now
        for (int district = 0; district < n; district++) {
            long long beauty = code[next] ^ code[district];
            if (!inTree[district] && beauty > bestLink[district]) bestLink[district] = beauty;
        }
    }
    cout << total << '\n';
}
