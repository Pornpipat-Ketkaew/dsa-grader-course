#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false); cin.tie(0);
    int N, D, Z;
    long long T;
    cin >> N >> D >> T >> Z;

    // cost[z] = tiredness of every dungeon that gives item type z
    vector<vector<long long>> cost(Z);
    for (int i = 0; i < D; i++) {
        long long t; int z;
        cin >> t >> z;
        cost[z].push_back(t);
    }
    // Greedy: whenever we need an item of type z, explore the CHEAPEST unexplored dungeon of type z.
    // Sort each type's costs once and keep a pointer to the next unused one.
    for (int z = 0; z < Z; z++) sort(cost[z].begin(), cost[z].end());
    vector<int> nextUnused(Z, 0);          // cost[z][nextUnused[z]] = cheapest dungeon of type z not explored yet

    long long power = T;
    int defeated = 0;
    bool stopped = false;
    for (int b = 0; b < N; b++) {          // bosses must be beaten in order 0, 1, ..., N-1
        int q;
        cin >> q;
        for (int j = 0; j < q; j++) {      // read the whole line even after we stopped
            int z;
            cin >> z;
            if (stopped) continue;
            if (nextUnused[z] == (int)cost[z].size()) { stopped = true; continue; }  // no dungeon left for z
            power -= cost[z][nextUnused[z]];
            nextUnused[z]++;               // that dungeon is used up; the item vanishes after this boss
            if (power < 0) stopped = true; // not enough power to collect this boss's items
        }
        if (!stopped) defeated++;
    }
    cout << defeated << "\n";
}
