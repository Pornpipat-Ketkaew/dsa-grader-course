#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    long long k;
    cin >> n >> m >> k;
    vector<long long> values(n);
    // index = 0..n-1
    for (int index = 0; index < n; index++) cin >> values[index];
    sort(values.begin(), values.end());

    string output;
    // query = 0..m-1
    for (int query = 0; query < m; query++) {
        long long p;
        cin >> p;
        // In sorted order the values inside [p - k, p + k] are one block:
        // from the first value >= p - k up to (not including) the first value > p + k.
        auto first = lower_bound(values.begin(), values.end(), p - k);
        auto pastLast = upper_bound(values.begin(), values.end(), p + k);
        output += to_string(pastLast - first);
        output += (query + 1 < m ? ' ' : '\n');
    }
    cout << output;
}
