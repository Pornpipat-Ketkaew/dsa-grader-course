#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    std::ios_base::sync_with_stdio(false); std::cin.tie(0);

    int n, m;
    cin >> n >> m;

    // Encode (year, month) as ONE number that sorts in time order:
    // key = year * 12 + (month - 1)   -> months of the same year are consecutive,
    // and Dec of year y (y*12+11) is just before Jan of year y+1 ((y+1)*12+0).
    vector<long long> pub(n);
    // i visits 0, 1, ..., n-1: read each published (year, month) and encode it.
    for (int i = 0; i < n; i++) {
        long long a, b;
        cin >> a >> b;
        pub[i] = a * 12 + (b - 1);
    }
    sort(pub.begin(), pub.end());          // the input is NOT sorted (see sample 2)

    // q visits 0, 1, ..., m-1: answer each question in input order.
    for (int q = 0; q < m; q++) {
        long long a, b;
        cin >> a >> b;
        long long key = a * 12 + (b - 1);

        // idx = first published month that is >= the asked month
        int idx = lower_bound(pub.begin(), pub.end(), key) - pub.begin();

        if (idx < n && pub[idx] == key) {
            cout << "0 0";                         // published exactly that month
        } else if (idx == 0) {
            cout << "-1 -1";                       // asked month is before the first publication
        } else {
            long long k = pub[idx - 1];            // latest publication strictly before the asked month
            cout << k / 12 << ' ' << k % 12 + 1;   // decode back to year, month
        }
        if (q < m - 1) cout << ' ';
    }
    cout << '\n';
}
