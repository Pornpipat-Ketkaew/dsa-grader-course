#include <iostream>
#include <vector>
using namespace std;

vector<int> parent;   // disjoint-set forest: parent[x] == x means x is a root

int findRoot(int x) {
    // follow parents up to the root, then point x straight at it (path compression)
    if (parent[x] != x) parent[x] = findRoot(parent[x]);
    return parent[x];
}

int main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int T;
    cin >> T;
    // handle the T graphs one by one
    for (int t = 0; t < T; t++) {
        int n, e;
        cin >> n >> e;
        parent.resize(n);
        // every vertex 0..n-1 starts in its own set
        for (int i = 0; i < n; i++) parent[i] = i;
        bool cycle = false;
        // read ALL e edges (even after a cycle is found, so the next graph starts at the right line)
        for (int i = 0; i < e; i++) {
            int a, b;
            cin >> a >> b;
            int ra = findRoot(a), rb = findRoot(b);
            if (ra == rb) cycle = true;     // a and b were already connected: this edge closes a cycle
            else parent[ra] = rb;           // otherwise the edge joins two different pieces
        }
        cout << (cycle ? "YES" : "NO") << "\n";
    }
}
