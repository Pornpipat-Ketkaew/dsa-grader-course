#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false); cin.tie(0);

    long long n, a;
    cin >> n >> a;

    // In an array heap the children of i are 2i+1 and 2i+2.
    // So the descendants of a, ONE LEVEL AT A TIME, are contiguous ranges:
    //   level 0: [a, a]
    //   level 1: [2a+1, 2a+2]
    //   level 2: [2(2a+1)+1, 2(2a+2)+2] = [4a+3, 4a+6]   ...
    // In general, if one level is [lo, hi], the next is [2*lo+1, 2*hi+2].
    // Every range starts after the previous one ends, so printing level by level
    // already gives the indices in increasing order.
    vector<long long> ans;
    long long lo = a, hi = a;
    while (lo < n) {                         // a level that starts inside the heap
        long long last = (hi < n - 1) ? hi : n - 1;   // the bottom level may be cut short by n
        // i visits lo, lo+1, ..., last (left to right): every node of this level that exists
        for (long long i = lo; i <= last; i++) {
            ans.push_back(i);
        }
        lo = 2 * lo + 1;                     // leftmost child of the leftmost node
        hi = 2 * hi + 2;                     // rightmost child of the rightmost node
    }

    cout << ans.size() << '\n';
    // k visits 0, 1, ..., ans.size()-1: print the indices separated by spaces
    for (int k = 0; k < (int)ans.size(); k++) {
        if (k > 0) cout << ' ';
        cout << ans[k];
    }
    cout << '\n';
}
