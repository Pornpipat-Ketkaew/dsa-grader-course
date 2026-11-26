#include <iostream>
#include <vector>
#include <queue>
#include <tuple>
#include <functional>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m, portals;
    cin >> n >> m >> portals;
    vector<vector<pair<int, int>>> tunnels(n + 1);   // tunnels[room] = (next room, time)
    // index = 0..m-1: every tunnel goes both ways
    for (int index = 0; index < m; index++) {
        int u, v, time;
        cin >> u >> v >> time;
        tunnels[u].push_back({v, time});
        tunnels[v].push_back({u, time});
    }

    // Layered graph: state (used, room) = "in this room, having fired the gun `used` times".
    // A tunnel from (used, room) goes to (used, next) for its time, or, if a shot
    // is left, to (used + 1, next) for 0. Dijkstra on these (K + 1) * N states.
    const long long UNREACHED = -1;
    vector<vector<long long>> best(portals + 1, vector<long long>(n + 1, UNREACHED));
    using State = tuple<long long, int, int>;        // (time so far, used, room)
    priority_queue<State, vector<State>, greater<State>> heap;
    best[0][1] = 0;
    heap.push({0, 0, 1});
    long long answer = UNREACHED;
    // pop states in increasing time
    while (!heap.empty()) {
        auto [timeHere, used, room] = heap.top();
        heap.pop();
        if (timeHere > best[used][room]) continue;     // outdated entry
        if (room == n) {                               // the first popped exit state is the best one
            answer = timeHere;
            break;
        }
        auto relax = [&](int nextUsed, int next, long long arrive) {
            if (best[nextUsed][next] == UNREACHED || arrive < best[nextUsed][next]) {
                best[nextUsed][next] = arrive;
                heap.push({arrive, nextUsed, next});
            }
        };
        for (auto [next, time] : tunnels[room]) {
            relax(used, next, timeHere + time);                  // walk the tunnel
            if (used < portals) relax(used + 1, next, timeHere); // shoot a portal through it
        }
    }
    cout << answer << '\n';
}
