#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, costOneTwo;
    cin >> n >> costOneTwo;
    const int NO_ROAD = 1000000000;
    // cost[a][b] = cheapest known a -> b (1-based); starts as the direct road
    vector<vector<int>> cost(n + 1, vector<int>(n + 1, NO_ROAD));
    // province = 1..n: staying put is free
    for (int province = 1; province <= n; province++) cost[province][province] = 0;
    cost[1][2] = cost[2][1] = costOneTwo;
    // year = 3..n: roads built that year join province "year" to older provinces
    for (int year = 3; year <= n; year++) {
        int roads;
        cin >> roads;
        // road = 0..k[year]-1
        for (int road = 0; road < roads; road++) {
            int older, price;
            cin >> older >> price;
            if (price < cost[year][older]) cost[year][older] = cost[older][year] = price;
        }
    }

    // Floyd-Warshall, with provinces allowed as stop-overs in the order 1, 2, 3, ...
    // After phase "via", cost[a][b] = cheapest a -> b using only stop-overs <= via.
    // A 1 -> 2 route whose stop-overs are all <= via uses only provinces 1..via,
    // i.e. only roads that exist after year "via". So after phase via (>= 3),
    // cost[1][2] is exactly that year's answer.
    string answer;
    // via = 1..n (upward: this order is what makes each phase match a year)
    for (int via = 1; via <= n; via++) {
        // from = 1..n, to = 1..n: try "from -> via -> to" for every pair
        for (int from = 1; from <= n; from++) {
            int toVia = cost[from][via];
            if (toVia == NO_ROAD) continue;
            for (int to = 1; to <= n; to++)
                if (toVia + cost[via][to] < cost[from][to]) cost[from][to] = toVia + cost[via][to];
        }
        if (via >= 3) answer += to_string(cost[1][2]) + (via < n ? ' ' : '\n');
    }
    cout << answer;
}
