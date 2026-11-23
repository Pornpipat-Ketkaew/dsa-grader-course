#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<int, int>> cls(n);            // (finish, start) so that sort orders by finish time
    // read the n start times
    for (int i = 0; i < n; i++) cin >> cls[i].second;
    // read the n finish times
    for (int i = 0; i < n; i++) cin >> cls[i].first;
    sort(cls.begin(), cls.end());             // earliest finish first

    int count = 0;
    long long lastEnd = -1;                   // finish time of the last class we kept (none yet)
    // greedy: walk classes by finish time, keep each one that starts after the last kept one ends
    for (int i = 0; i < n; i++) {
        if (cls[i].second >= lastEnd) {       // S >= F of the previous class: no overlap
            count++;
            lastEnd = cls[i].first;
        }
    }
    cout << count << "\n";
}
