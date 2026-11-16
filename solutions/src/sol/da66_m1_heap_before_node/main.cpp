#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false); cin.tie(0);

    int n, m;
    cin >> n >> m;

    // Which slots could hold a value that is popped BEFORE slot m?
    //  - every DESCENDANT of m is <= m (heap property), so it can never be popped before m;
    //  - m itself is not "higher than itself";
    //  - EVERY other node (ancestors, and all nodes in other branches) can hold a bigger value
    //    in some valid heap.
    // So: answer = all indices EXCEPT the subtree rooted at m.

    // Mark the subtree of m level by level: if one level is [lo, hi], the next is [2lo+1, 2hi+2].
    vector<bool> inSub(n, false);
    long long lo = m, hi = m;
    while (lo < n) {
        long long last = (hi < n - 1) ? hi : n - 1;
        // i visits lo .. last (left to right): the nodes of this level that exist
        for (long long i = lo; i <= last; i++) inSub[i] = true;
        lo = 2 * lo + 1;
        hi = 2 * hi + 2;
    }

    // i visits 0, 1, ..., n-1 (increasing order, as the output requires)
    vector<int> ans;
    for (int i = 0; i < n; i++) {
        if (!inSub[i]) ans.push_back(i);
    }

    cout << ans.size() << '\n';
    // k visits 0 .. ans.size()-1: print separated by spaces (an empty line if ans is empty)
    for (int k = 0; k < (int)ans.size(); k++) {
        if (k > 0) cout << ' ';
        cout << ans[k];
    }
    cout << '\n';
}
