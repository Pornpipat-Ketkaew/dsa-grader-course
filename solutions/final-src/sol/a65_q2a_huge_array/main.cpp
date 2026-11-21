#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false); cin.tie(0);
    int n, q;
    cin >> n >> q;
    vector<pair<long long, long long>> g(n);          // (value X, how many copies C)
    for (int i = 0; i < n; i++) cin >> g[i].first >> g[i].second;

    // Sort the GROUPS by value (n groups, not S numbers): the sorted huge array
    // is just these groups laid out one after another.
    sort(g.begin(), g.end());

    // last[i] = position (1-based) of the LAST copy of group i in the sorted array
    //         = C[0] + C[1] + ... + C[i]      (prefix sum; can reach 2e9 -> long long)
    vector<long long> last(n);
    long long run = 0;
    for (int i = 0; i < n; i++) {                     // i = 0, 1, ..., n-1 (left to right)
        run += g[i].second;
        last[i] = run;
    }

    while (q--) {
        long long p;
        cin >> p;
        // The group holding position p is the FIRST group whose last position is >= p.
        int i = lower_bound(last.begin(), last.end(), p) - last.begin();
        cout << g[i].first << "\n";
    }
}
