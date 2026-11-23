#include <iostream>
#include <vector>
#include <algorithm>
#include <array>
using namespace std;

vector<int> par;
int findRoot(int x) {
    // walk up to the root, halving the path on the way
    while (par[x] != x) { par[x] = par[par[x]]; x = par[x]; }
    return x;
}

int main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int N, M, U, K;
    cin >> N >> M >> U >> K;
    vector<array<int, 3>> E(M);               // (d, u, v) so that sort orders by length
    // read the M possible cable routes
    for (int i = 0; i < M; i++) cin >> E[i][1] >> E[i][2] >> E[i][0];
    sort(E.begin(), E.end());

    // Kruskal: the cheapest set of cables that connects all N cities
    par.resize(N + 1);
    for (int i = 1; i <= N; i++) par[i] = i;
    vector<int> used;                         // lengths of the MST edges, in increasing order
    for (int i = 0; i < M; i++) {
        int a = findRoot(E[i][1]), b = findRoot(E[i][2]);
        if (a == b) continue;                 // would close a cycle
        par[a] = b;
        used.push_back(E[i][0]);
    }
    // K modems join K pieces for free: drop the K-1 longest MST cables (none if K <= 1)
    int drop = max(0, K - 1);
    long long meters = 0;
    for (int i = 0; i < (int)used.size() - drop; i++) meters += used[i];
    cout << meters * U << "\n";
}
