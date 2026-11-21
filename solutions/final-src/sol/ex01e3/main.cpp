#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int n, m;
    cin >> n >> m;
    vector<int> A(n);
    // read A[0], A[1], ..., A[n-1] (already strictly increasing)
    for (int i = 0; i < n; i++) cin >> A[i];

    // answer each of the m queries in input order
    for (int q = 0; q < m; q++) {
        double x;                      // the queries are REAL numbers, e.g. 14.5
        cin >> x;
        // Invariant: every index < lo holds a value <= x,
        //            every index > hi holds a value  > x.
        int lo = 0, hi = n - 1, ans = -1;
        // the window [lo, hi] halves on every turn, so at most ~17 turns for n = 100,000
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (A[mid] <= x) {         // A[mid] is a candidate; a bigger one can only be to its right
                ans = A[mid];
                lo = mid + 1;
            } else {                   // A[mid] is too big, and so is everything to its right
                hi = mid - 1;
            }
        }
        cout << ans << "\n";
    }
}
