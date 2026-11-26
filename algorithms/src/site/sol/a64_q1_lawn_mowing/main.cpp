#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m, k;
    cin >> n >> m >> k;
    // grassBefore[i] = A[0] + ... + A[i-1]       (grass in cells 0..i-1)
    // costBefore[i]  = grassBefore[i] + i * k    (price of mowing cells 0..i-1)
    // Mowing l..r then costs costBefore[r+1] - costBefore[l]: two lookups.
    vector<long long> grassBefore(n + 1), costBefore(n + 1);   // [0] = 0: the empty prefix
    // cell = 0..n-1 (left to right): extend both prefix sums by one cell
    for (int cell = 0; cell < n; cell++) {
        int grass;
        cin >> grass;
        grassBefore[cell + 1] = grassBefore[cell] + grass;
        costBefore[cell + 1] = costBefore[cell] + grass + k;
    }

    string output;
    // query = 0..m-1: each question is answered on its own
    for (int query = 0; query < m; query++) {
        int start;
        long long budget;
        cin >> start >> budget;
        // costBefore never decreases (grass >= 0, k >= 0), so the cells we can
        // afford end right before the first end whose cost goes over the budget:
        // find the last end with costBefore[end] <= costBefore[start] + budget.
        long long limit = costBefore[start] + budget;
        int end = int(upper_bound(costBefore.begin() + start, costBefore.end(), limit) - costBefore.begin()) - 1;
        output += to_string(grassBefore[end] - grassBefore[start]);
        output += '\n';
    }
    cout << output;
}
