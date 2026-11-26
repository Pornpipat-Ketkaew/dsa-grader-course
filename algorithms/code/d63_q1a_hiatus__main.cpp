#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    cin >> n >> m;
    // A (year, month) pair becomes one number that sorts in time order:
    // year * 12 + (month - 1). Then "latest month before" is plain binary search.
    vector<int> published(n);
    // index = 0..n-1
    for (int index = 0; index < n; index++) {
        int year, month;
        cin >> year >> month;
        published[index] = year * 12 + (month - 1);
    }
    sort(published.begin(), published.end());

    string output;
    // query = 0..m-1
    for (int query = 0; query < m; query++) {
        int year, month;
        cin >> year >> month;
        int asked = year * 12 + (month - 1);
        // after = first published month that is later than the one asked
        auto after = upper_bound(published.begin(), published.end(), asked);
        if (after == published.begin()) output += "-1 -1";           // nothing up to that month
        else {
            int latest = *(after - 1);                               // last month <= asked
            if (latest == asked) output += "0 0";                    // published that very month
            else output += to_string(latest / 12) + ' ' + to_string(latest % 12 + 1);
        }
        output += (query + 1 < m ? ' ' : '\n');
    }
    cout << output;
}
