#include <iostream>
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<pair<int, int>> classes(n);       // (finish, start): sorting orders by finish time
    // index = 0..n-1: the n start times
    for (int index = 0; index < n; index++) cin >> classes[index].second;
    // index = 0..n-1: the n finish times
    for (int index = 0; index < n; index++) cin >> classes[index].first;
    sort(classes.begin(), classes.end());    // earliest finish first

    int chosen = 0;
    int lastFinish = INT_MIN;                // finish time of the last chosen class (none yet)
    // index = 0..n-1 in order of finish time: keep a class if it starts after the last kept one ends
    for (int index = 0; index < n; index++) {
        if (classes[index].second >= lastFinish) {
            chosen++;
            lastFinish = classes[index].first;
        }
    }
    cout << chosen << '\n';
}
