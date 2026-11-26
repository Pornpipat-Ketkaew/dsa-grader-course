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
    // index = 0..n-1: the array is already strictly increasing
    for (int index = 0; index < n; index++) cin >> sorted[index];

    string output;
    // query = 0..m-1: each query is answered on its own
    for (int query = 0; query < m; query++) {
        double x;                               // the queries may be real numbers
        cin >> x;
        // Invariant: sorted[left] <= x is still possible, sorted[right] > x is known.
        // Treat left = -1 as "nothing <= x" and right = n as "past the end".
        int left = -1, right = n;
        // halve [left, right] until they are neighbours
        while (right - left > 1) {
            int middle = left + (right - left) / 2;
            if (sorted[middle] <= x) left = middle;   // middle is a candidate: move up
            else right = middle;                      // too big: answer is below middle
        }
        output += (left == -1 ? "-1" : to_string(sorted[left]));
        output += '\n';
    }
    cout << output;
}
