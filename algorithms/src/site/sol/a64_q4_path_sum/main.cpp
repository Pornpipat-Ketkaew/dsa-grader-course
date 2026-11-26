#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int nodeCount;
int target[8];
bool found[8];
int openCount = 8;                        // queries still answered "NO so far"
vector<pair<int, int>> neighbors[20];     // neighbors[node] = (next node, edge weight)
bool onPath[20];
int heaviestEdge[20];                     // heaviest edge weight touching each node
int remainingGain;                        // sum of heaviestEdge over nodes NOT on the path:
                                          // the path weight can never grow by more than this

// is some open query in the range low..high?
bool openQueryIn(int low, int high) {
    // query = 0..7: look at every query that is still open
    for (int query = 0; query < 8; query++)
        if (!found[query] && low <= target[query] && target[query] <= high) return true;
    return false;
}

// the simple path currently ends at node and has total weight pathWeight
void extend(int node, int pathWeight) {
    if (!openQueryIn(pathWeight, pathWeight + remainingGain)) return;   // bound: nothing reachable
    // query = 0..7: does this path answer an open query?
    for (int query = 0; query < 8; query++)
        if (!found[query] && target[query] == pathWeight) {
            found[query] = true;
            openCount--;
        }
    // edge = each (next, weight) of node: grow the path to a node not yet on it
    for (auto [next, weight] : neighbors[node]) {
        if (openCount == 0) return;       // all 8 answered: stop the whole search
        if (onPath[next]) continue;       // a simple path never revisits a node
        onPath[next] = true;
        remainingGain -= heaviestEdge[next];
        extend(next, pathWeight + weight);
        onPath[next] = false;             // undo
        remainingGain += heaviestEdge[next];
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    int edgeCount;
    cin >> nodeCount >> edgeCount;
    // query = 0..7: the 8 targets in input order
    for (int query = 0; query < 8; query++) cin >> target[query];
    // edge = 0..edgeCount-1: store each undirected edge in both directions
    for (int edge = 0; edge < edgeCount; edge++) {
        int a, b, weight;
        cin >> a >> b >> weight;
        neighbors[a].push_back({b, weight});
        neighbors[b].push_back({a, weight});
        heaviestEdge[a] = max(heaviestEdge[a], weight);
        heaviestEdge[b] = max(heaviestEdge[b], weight);
    }
    // node = 0..nodeCount-1: try heavy edges first (big targets are reached sooner),
    // and count every node's heaviest edge, since no node is on the path yet
    for (int node = 0; node < nodeCount; node++) {
        sort(neighbors[node].begin(), neighbors[node].end(),
             [](const pair<int, int> &x, const pair<int, int> &y) { return x.second > y.second; });
        remainingGain += heaviestEdge[node];
    }
    // start = 0..nodeCount-1: a path may start at any node
    for (int start = 0; start < nodeCount && openCount > 0; start++) {
        onPath[start] = true;
        remainingGain -= heaviestEdge[start];
        extend(start, 0);
        onPath[start] = false;
        remainingGain += heaviestEdge[start];
    }
    // query = 0..7: print the answers in input order
    for (int query = 0; query < 8; query++) cout << (found[query] ? "YES" : "NO") << '\n';
}
