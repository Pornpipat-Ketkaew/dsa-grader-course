#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    vector<vector<int>> neighbors(n);
    vector<int> degree(n, 0);
    // edge = 0..n-1: n nodes and n edges = a tree plus one extra edge = one cycle
    for (int edge = 0; edge < n; edge++) {
        int x, y;
        cin >> x >> y;
        neighbors[x].push_back(y);
        neighbors[y].push_back(x);
        degree[x]++;
        degree[y]++;
    }

    // Peel the leaves. A node of degree 1 is a dead end and cannot lie on the
    // cycle; removing it may turn its neighbour into a new leaf. When no leaf
    // is left, every remaining node has degree 2: exactly the cycle.
    vector<int> leaves;
    // node = 0..n-1: collect the leaves of the original graph
    for (int node = 0; node < n; node++)
        if (degree[node] == 1) leaves.push_back(node);

    int remaining = n;
    // keep removing leaves until none are left (order does not matter)
    while (!leaves.empty()) {
        int leaf = leaves.back();
        leaves.pop_back();
        degree[leaf] = 0;                    // degree 0 = removed
        remaining--;
        for (int next : neighbors[leaf])
            if (degree[next] > 0 && --degree[next] == 1) leaves.push_back(next);
    }
    // a cycle has as many edges as nodes
    cout << remaining << '\n';
}
