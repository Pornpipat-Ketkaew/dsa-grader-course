#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int n, m;
    cin >> n >> m;
    vector<int> A(n);
    // read A[0], A[1], ..., A[n-1] (non-decreasing, duplicates allowed)
    for (int i = 0; i < n; i++) cin >> A[i];

    // answer each of the m queries in input order
    for (int q = 0; q < m; q++) {
        int x;
        cin >> x;
        // We want the LAST index i with A[i] <= x.
        // Invariant: every index < lo has A <= x, every index > hi has A > x.
        int lo = 0, hi = n - 1, ans = -1;
        // the window [lo, hi] halves on every turn
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (A[mid] <= x) {         // mid qualifies; keep it and look further RIGHT for a later one
                ans = mid;
                lo = mid + 1;
            } else {                   // mid and everything right of it are too big
                hi = mid - 1;
            }
        }
        cout << ans << "\n";
    }
}
