#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    // cost[a][b] = price of a cable between centres a and b: a complete graph
    vector<vector<int>> cost(n, vector<int>(n, 0));
    // a = 0..n-2: line a lists the cables a-(a+1), a-(a+2), ..., a-(n-1)
    for (int a = 0; a < n - 1; a++)
        for (int b = a + 1; b < n; b++) {
            cin >> cost[a][b];
            cost[b][a] = cost[a][b];
        }

    // Prim's algorithm, array version: on a complete graph every centre has
    // n - 1 cables anyway, so O(n^2) is optimal and needs no heap.
    // cheapestLink[v] = cheapest cable from v to any centre already in the tree.
    const int NONE = 1000000000;
    vector<int> cheapestLink(n, NONE);
    vector<bool> inTree(n, false);
    cheapestLink[0] = 0;                     // centre 0 starts the tree for free
    long long total = 0;
    // round = 0..n-1: each round brings exactly one centre into the tree
    for (int round = 0; round < n; round++) {
        int next = -1;
        // centre = 0..n-1: pick the outside centre with the cheapest link
        for (int centre = 0; centre < n; centre++)
            if (!inTree[centre] && (next == -1 || cheapestLink[centre] < cheapestLink[next])) next = centre;
        inTree[next] = true;
        total += cheapestLink[next];
        // centre = 0..n-1: "next" is in the tree now, its cables may be cheaper links
        for (int centre = 0; centre < n; centre++)
            if (!inTree[centre] && cost[next][centre] < cheapestLink[centre]) cheapestLink[centre] = cost[next][centre];
    }
    cout << total << '\n';
}
