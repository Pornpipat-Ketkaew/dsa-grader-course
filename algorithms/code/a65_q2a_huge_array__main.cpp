#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, q;
    cin >> n >> q;
    vector<pair<int, int>> runs(n);            // (value, copies)
    // index = 0..n-1
    for (int index = 0; index < n; index++) cin >> runs[index].first >> runs[index].second;
    sort(runs.begin(), runs.end());            // the huge array, sorted, is these runs in this order

    // last[i] = position (1-based) of the last copy of runs[i] in the sorted huge array
    vector<long long> last(n);
    long long total = 0;
    // index = 0..n-1 (left to right): running total of copies
    for (int index = 0; index < n; index++) {
        total += runs[index].second;
        last[index] = total;
    }

    string output;
    // query = 0..q-1
    for (int query = 0; query < q; query++) {
        long long position;
        cin >> position;
        // the run holding this position is the first one whose last copy is at or after it
        int run = int(lower_bound(last.begin(), last.end(), position) - last.begin());
        output += to_string(runs[run].first);
        output += '\n';
    }
    cout << output;
}
