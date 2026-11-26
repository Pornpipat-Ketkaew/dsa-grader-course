#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m, k;
    cin >> n >> m >> k;
    vector<vector<int>> neighbors(n + 1);
    // road = 0..m-1: a two-way road goes into both cities' lists
    for (int road = 0; road < m; road++) {
        int u, v;
        cin >> u >> v;
        neighbors[u].push_back(v);
        neighbors[v].push_back(u);
    }

    // BFS from city 1. The queue array itself is the visiting order, and
    // every city in it (except city 1) was discovered from a city placed
    // EARLIER in the array. So any prefix of the order is connected on its
    // own: the first k cities are an answer. The kingdom is connected, so
    // the BFS reaches all n >= k cities.
    vector<bool> discovered(n + 1, false);
    vector<int> order;
    order.reserve(n);
    order.push_back(1);
    discovered[1] = true;
    // read = 0, 1, 2, ... (front of the queue moves forward);
    // stop as soon as k cities are known: the rest is not needed
    for (int read = 0; (int)order.size() < k; read++) {
        int city = order[read];
        for (int next : neighbors[city])
            if (!discovered[next]) {
                discovered[next] = true;
                order.push_back(next);
            }
    }

    // index = 0..k-1: print the first k cities of the BFS order
    for (int index = 0; index < k; index++) cout << order[index] << (index + 1 < k ? ' ' : '\n');
}
