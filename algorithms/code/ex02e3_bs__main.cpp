#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    cin >> n >> m;
    vector<int> sorted(n);
    // index = 0..n-1: non-decreasing, values may repeat
    for (int index = 0; index < n; index++) cin >> sorted[index];

    string output;
    // query = 0..m-1: each query is answered on its own
    for (int query = 0; query < m; query++) {
        int x;
        cin >> x;
        // Invariant: every index <= left holds a value <= x, every index >= right a value > x.
        // left = -1 / right = n are the imaginary ends. Equal values all go LEFT,
        // so left ends on the LAST copy of the largest value <= x.
        int left = -1, right = n;
        // halve [left, right] until they are neighbours
        while (right - left > 1) {
            int middle = left + (right - left) / 2;
            if (sorted[middle] <= x) left = middle;
            else right = middle;
        }
        output += to_string(left);              // -1 when nothing is <= x
        output += '\n';
    }
    cout << output;
}
