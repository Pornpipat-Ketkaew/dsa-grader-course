#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

const long long INF = 1e18;

int main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int n, m, k;
    cin >> n >> m >> k;
    vector<int> s(k);
    // the k stations Somchai wants to visit
    for (int i = 0; i < k; i++) cin >> s[i];
    vector<vector<pair<int, int>>> adj(n + 1);
    // the m two-way train lines
    for (int i = 0; i < m; i++) {
        int a, b, c;
        cin >> a >> b >> c;
        adj[a].push_back({b, c});
        adj[b].push_back({a, c});
    }

    // step 1: Dijkstra from each of the k sites -> D[i][j] = cheapest fare from site i to site j
    vector<vector<long long>> D(k, vector<long long>(k));
    for (int i = 0; i < k; i++) {
        vector<long long> dist(n + 1, INF);
        priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<>> pq;
        dist[s[i]] = 0;
        pq.push({0, s[i]});
        // standard Dijkstra: take the closest unfinished station
        while (!pq.empty()) {
            auto [d, u] = pq.top(); pq.pop();
            if (d > dist[u]) continue;        // an old, longer entry
            // relax every line out of u
            for (auto [v, c] : adj[u]) {
                if (d + c < dist[v]) { dist[v] = d + c; pq.push({dist[v], v}); }
            }
        }
        // keep only the distances to the other sites
        for (int j = 0; j < k; j++) D[i][j] = dist[s[j]];
    }

    // step 2: bitmask DP over the k sites
    // best[mask][last] = cheapest way to have visited exactly the sites in mask, standing at site last
    int FULL = 1 << k;
    vector<vector<long long>> best(FULL, vector<long long>(k, INF));
    // start anywhere for free
    for (int i = 0; i < k; i++) best[1 << i][i] = 0;
    // masks in increasing order: a mask is finished before any bigger mask that contains it
    for (int mask = 1; mask < FULL; mask++) {
        // the site we are standing at
        for (int last = 0; last < k; last++) {
            if (!(mask >> last & 1) || best[mask][last] == INF) continue;
            // go next to a site not visited yet
            for (int nxt = 0; nxt < k; nxt++) {
                if (mask >> nxt & 1) continue;
                long long cand = best[mask][last] + D[last][nxt];
                int nm = mask | (1 << nxt);
                if (cand < best[nm][nxt]) best[nm][nxt] = cand;
            }
        }
    }
    long long ans = INF;
    // the trip may end at any site
    for (int last = 0; last < k; last++) ans = min(ans, best[FULL - 1][last]);
    cout << ans << "\n";
}
