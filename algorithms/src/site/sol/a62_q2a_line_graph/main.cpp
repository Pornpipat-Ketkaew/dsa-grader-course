#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int v, e;
    cin >> v >> e;
    vector<vector<int>> neighbors(v);
    // edge = 0..e-1: an undirected edge goes into both lists
    for (int edge = 0; edge < e; edge++) {
        int a, b;
        cin >> a >> b;
        neighbors[a].push_back(b);
        neighbors[b].push_back(a);
    }

    // A component is a line (a path) exactly when
    //   1. every node in it has degree <= 2, and
    //   2. it is a tree: edges = nodes - 1 (this rules out a ring).
    // One traversal per component collects both facts.
    vector<bool> visited(v, false);
    vector<int> stack;
    int lineComponents = 0;
    // start = 0..v-1: an unvisited node opens a new component
    for (int start = 0; start < v; start++) {
        if (visited[start]) continue;
        long long nodes = 0, degreeSum = 0;
        bool degreesOk = true;
        visited[start] = true;
        stack.push_back(start);
        // iterative DFS (a path of 100 000 nodes would be too deep for recursion):
        // pop a node, record its degree, push its unvisited neighbours
        while (!stack.empty()) {
            int node = stack.back();
            stack.pop_back();
            nodes++;
            degreeSum += neighbors[node].size();
            if (neighbors[node].size() > 2) degreesOk = false;
            for (int next : neighbors[node])
                if (!visited[next]) {
                    visited[next] = true;
                    stack.push_back(next);
                }
        }
        long long edges = degreeSum / 2;     // every edge was counted from both ends
        if (degreesOk && edges == nodes - 1) lineComponents++;
    }
    cout << lineComponents << '\n';
}
