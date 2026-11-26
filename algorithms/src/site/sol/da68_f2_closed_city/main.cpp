#include <iostream>
#include <vector>
#include <queue>
#include <functional>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m, k;
    cin >> n >> m >> k;
    vector<bool> closed(n + 1, false);
    // index = 0..k-1: mark the closed cities
    for (int index = 0; index < k; index++) {
        int city;
        cin >> city;
        closed[city] = true;
    }
    vector<vector<pair<int, int>>> roads(n + 1);     // roads[a] = (b, length)
    // road = 0..m-1: a road touching a closed city can never be used, so it is
    // simply not added: the closed cities vanish from the graph
    for (int road = 0; road < m; road++) {
        int a, b, length;
        cin >> a >> b >> length;
        if (closed[a] || closed[b]) continue;
        roads[a].push_back({b, length});
        roads[b].push_back({a, length});
    }

    // plain Dijkstra from city 1 on the remaining graph
    const long long UNREACHED = -1;
    vector<long long> distance(n + 1, UNREACHED);
    priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<pair<long long, int>>> heap;
    distance[1] = 0;
    heap.push({0, 1});
    // pop cities in increasing distance
    while (!heap.empty()) {
        auto [distanceHere, city] = heap.top();
        heap.pop();
        if (distanceHere > distance[city]) continue;   // outdated entry
        if (city == n) break;                          // N is final once it is popped
        for (auto [next, length] : roads[city]) {
            long long through = distanceHere + length;
            if (distance[next] == UNREACHED || through < distance[next]) {
                distance[next] = through;
                heap.push({through, next});
            }
        }
    }
    cout << distance[n] << '\n';
}
