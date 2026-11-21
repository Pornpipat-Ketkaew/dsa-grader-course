#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    // t[i][j] = the j-th number on level i   (0-based: level i has i+1 numbers, j = 0..i)
    vector<vector<int>> t(n);
    for (int i = 0; i < n; i++) {           // levels top to bottom
        t[i].resize(i + 1);
        for (int j = 0; j <= i; j++) cin >> t[i][j];
    }
    // best[j] = the largest sum of a route that STARTS at (i, j) and goes down to the
    // bottom level. We fill it bottom-up, so it starts as the bottom row itself.
    vector<long long> best(t[n - 1].begin(), t[n - 1].end());
    // levels i = n-2 down to 0 (bottom-up, counting down with an int)
    for (int i = n - 2; i >= 0; i--) {
        // positions j = 0 .. i on level i, left to right.
        // best[j] and best[j+1] still hold level i+1's values when we read them,
        // because we overwrite best[j] only after using it.
        for (int j = 0; j <= i; j++) {
            best[j] = t[i][j] + max(best[j], best[j + 1]);
        }
    }
    cout << best[0] << "\n";               // the route must start at the top
}
