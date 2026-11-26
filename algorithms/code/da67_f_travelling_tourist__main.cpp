#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

const long long INF = 1e18;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    int stationCount, lineCount, siteCount;
    cin >> stationCount >> lineCount >> siteCount;
    vector<int> site(siteCount);
    // index = 0..siteCount-1: the stations Somchai wants to visit
    for (int index = 0; index < siteCount; index++) cin >> site[index];
    vector<vector<pair<int, int>>> neighbors(stationCount + 1);
    // line = 0..lineCount-1: two-way train lines (station, fare)
    for (int line = 0; line < lineCount; line++) {
        int a, b, fare;
        cin >> a >> b >> fare;
        neighbors[a].push_back({b, fare});
        neighbors[b].push_back({a, fare});
    }

    // Step 1: Dijkstra from every site -> fare[from][to] = cheapest fare between two sites
    vector<vector<long long>> fare(siteCount, vector<long long>(siteCount));
    // from = 0..siteCount-1: one Dijkstra per site
    for (int from = 0; from < siteCount; from++) {
        vector<long long> distance(stationCount + 1, INF);
        priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<>> queue;
        distance[site[from]] = 0;
        queue.push({0, site[from]});
        // until the queue is empty: settle the closest station, relax its lines
        while (!queue.empty()) {
            auto [dist, station] = queue.top();
            queue.pop();
            if (dist > distance[station]) continue;              // outdated entry
            // (next, cost) = every line out of this station
            for (auto [next, cost] : neighbors[station])
                if (dist + cost < distance[next]) {
                    distance[next] = dist + cost;
                    queue.push({distance[next], next});
                }
        }
        // to = 0..siteCount-1: keep only the distances to the sites
        for (int to = 0; to < siteCount; to++) fare[from][to] = distance[site[to]];
    }

    // Step 2: bitmask DP over the sites.
    // best[visited][last] = cheapest way to have visited exactly the set `visited`, standing at `last`
    int allSites = (1 << siteCount) - 1;
    vector<vector<long long>> best(allSites + 1, vector<long long>(siteCount, INF));
    // start = 0..siteCount-1: the trip may start at any site for free
    for (int start = 0; start < siteCount; start++) best[1 << start][start] = 0;
    // visited = 1..allSites (increasing): adding a site makes the number bigger,
    // so every state is final before it is extended
    for (int visited = 1; visited <= allSites; visited++) {
        // last = 0..siteCount-1: where we stand now
        for (int last = 0; last < siteCount; last++) {
            if (!(visited >> last & 1) || best[visited][last] == INF) continue;
            // next = 0..siteCount-1: travel to a site not visited yet
            for (int next = 0; next < siteCount; next++) {
                if (visited >> next & 1) continue;
                int grown = visited | (1 << next);
                best[grown][next] = min(best[grown][next], best[visited][last] + fare[last][next]);
            }
        }
    }
    long long answer = INF;
    // last = 0..siteCount-1: the trip may end at any site
    for (int last = 0; last < siteCount; last++) answer = min(answer, best[allSites][last]);
    cout << answer << '\n';
}
