#include <iostream>
#include <iomanip>
#include <vector>
#include <cmath>
#include <algorithm>
using namespace std;

struct Zipline {
    double length;
    int a, b;
};

vector<int> parent;                          // union-find forest over the trees

int findRoot(int tree) {
    // walk up to the root, pointing every other node at its grandparent (path halving)
    while (parent[tree] != tree) {
        parent[tree] = parent[parent[tree]];
        tree = parent[tree];
    }
    return tree;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    cin >> n >> m;
    vector<int> height(n);
    // tree = 0..n-1: height of its anchor point
    for (int tree = 0; tree < n; tree++) cin >> height[tree];
    vector<Zipline> lines(m);
    // index = 0..m-1: a measured pair; the wire runs along the slope, so its
    // length is the hypotenuse of the ground distance and the height difference
    for (int index = 0; index < m; index++) {
        int ground;
        cin >> lines[index].a >> lines[index].b >> ground;
        int rise = height[lines[index].a] - height[lines[index].b];
        lines[index].length = sqrt((double)ground * ground + (double)rise * rise);
    }
    // Maximum spanning tree: Kruskal with the LONGEST lines first.
    sort(lines.begin(), lines.end(), [](const Zipline& x, const Zipline& y) { return x.length > y.length; });

    parent.resize(n);
    // tree = 0..n-1: every tree starts as its own network
    for (int tree = 0; tree < n; tree++) parent[tree] = tree;
    double wire = 0;
    // lines in decreasing length: take a line unless it would close a loop
    for (const Zipline& line : lines) {
        int rootA = findRoot(line.a), rootB = findRoot(line.b);
        if (rootA == rootB) continue;
        parent[rootA] = rootB;
        wire += line.length;
    }
    cout << fixed << setprecision(2) << wire << '\n';
}
