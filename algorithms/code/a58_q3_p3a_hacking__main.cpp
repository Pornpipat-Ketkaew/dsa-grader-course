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
    vector<int> firstTargets(k);
    // target = 0..k-1: the servers attacked at time 0
    for (int target = 0; target < k; target++) cin >> firstTargets[target];
    vector<int> hackTime(n);                     // c[i]: seconds to break into server i
    // server = 0..n-1
    for (int server = 0; server < n; server++) cin >> hackTime[server];
    vector<vector<int>> neighbors(n);
    // cable = 0..m-1 (the samples list m cables)
    for (int cable = 0; cable < m; cable++) {
        int a, b;
        cin >> a >> b;
        neighbors[a].push_back(b);
        neighbors[b].push_back(a);
    }

    // hackedAt[v] = earliest moment server v falls. A first target falls at
    // c[target]; from a hacked server u, a neighbour v falls at hackedAt[u] + c[v].
    // That is Dijkstra with the weight on the server being entered, started from
    // all k first targets at once (multi-source).
    const int NOT_YET = -1;
    vector<int> hackedAt(n, NOT_YET);
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> heap;   // (time, server)
    for (int server : firstTargets) {
        hackedAt[server] = hackTime[server];
        heap.push({hackedAt[server], server});
    }
    // pop servers in the order they fall
    while (!heap.empty()) {
        auto [time, server] = heap.top();
        heap.pop();
        if (time > hackedAt[server]) continue;   // outdated entry
        for (int next : neighbors[server]) {
            int fallsAt = time + hackTime[next];
            if (hackedAt[next] == NOT_YET || fallsAt < hackedAt[next]) {
                hackedAt[next] = fallsAt;
                heap.push({fallsAt, next});
            }
        }
    }

    int allHacked = 0;
    // server = 0..n-1: the network is fully hacked when the LAST server falls
    for (int server = 0; server < n; server++) allHacked = max(allHacked, hackedAt[server]);
    cout << allHacked << '\n';
}
