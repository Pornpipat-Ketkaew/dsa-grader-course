#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    std::ios_base::sync_with_stdio(false); std::cin.tie(0);

    int n, m;
    long long k;                         // k can be 1e9, so p+k can reach 2e9 -> long long
    cin >> n >> m >> k;

    vector<long long> a(n);
    // Read the list: i visits indices 0, 1, ..., n-1 (left to right), one number each.
    for (int i = 0; i < n; i++) cin >> a[i];

    sort(a.begin(), a.end());            // binary search needs a sorted array

    // Answer the queries: q visits 0, 1, ..., m-1 so the answers come out in input order.
    for (int q = 0; q < m; q++) {
        long long p;
        cin >> p;
        long long lo = p - k;            // left end of [p-k, p+k]  (may be negative: fine)
        long long hi = p + k;            // right end               (up to 2e9: needs long long)

        // L = index of the first element >= lo
        int L = lower_bound(a.begin(), a.end(), lo) - a.begin();
        // R = index of the first element >  hi
        int R = upper_bound(a.begin(), a.end(), hi) - a.begin();

        // the elements inside the interval are exactly a[L], a[L+1], ..., a[R-1]
        cout << (R - L);
        if (q < m - 1) cout << ' ';
    }
    cout << '\n';
}
