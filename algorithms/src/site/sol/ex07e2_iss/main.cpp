#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    // ways[sum] = number of non-decreasing sequences with this sum using only parts 1..part
    vector<long long> ways(n + 1, 0);
    ways[0] = 1;                                     // the empty sequence
    // part = 1..n: allow one more part size, smallest first, so each sequence is
    // built in sorted order and counted exactly once
    for (int part = 1; part <= n; part++) {
        // sum = part..n (increasing): ways[sum - part] may already use `part`,
        // which lets a part repeat any number of times
        for (int sum = part; sum <= n; sum++) ways[sum] += ways[sum - part];
    }
    cout << ways[n] << '\n';
}
