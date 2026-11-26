#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Route {
    int length, a, b;
};

vector<int> parent;                          // union-find forest over the cities

int findRoot(int city) {
    // walk up to the root, pointing every other node at its grandparent (path halving)
    while (parent[city] != city) {
        parent[city] = parent[parent[city]];
        city = parent[city];
    }
    return city;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m, pricePerMeter, modems;
    cin >> n >> m >> pricePerMeter >> modems;
    vector<Route> routes(m);
    // index = 0..m-1: read every route
    for (int index = 0; index < m; index++) cin >> routes[index].a >> routes[index].b >> routes[index].length;
    sort(routes.begin(), routes.end(), [](const Route& x, const Route& y) { return x.length < y.length; });

    // Kruskal: shortest routes first, skip a route that would close a cycle.
    parent.resize(n + 1);
    // city = 1..n: every city starts as its own tree
    for (int city = 1; city <= n; city++) parent[city] = city;
    vector<int> treeLengths;                 // MST cables, in increasing length
    // routes in increasing length
    for (const Route& route : routes) {
        int rootA = findRoot(route.a), rootB = findRoot(route.b);
        if (rootA == rootB) continue;
        parent[rootA] = rootB;
        treeLengths.push_back(route.length);
    }

    // K modems link K separate pieces for free, which replaces K - 1 cables.
    // The best cables to replace are the K - 1 LONGEST tree cables (see the page).
    int replaced = max(0, modems - 1);
    long long meters = 0;
    // index = 0..(tree size - replaced - 1): keep every cable except the longest ones
    for (int index = 0; index < (int)treeLengths.size() - replaced; index++) meters += treeLengths[index];
    cout << meters * pricePerMeter << '\n';
}
