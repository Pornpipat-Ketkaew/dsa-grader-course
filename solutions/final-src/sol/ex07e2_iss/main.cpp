#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    // ways[s] = number of non-decreasing sequences with sum s that use only parts 1..p
    vector<long long> ways(n + 1, 0);
    ways[0] = 1;                              // the empty sequence
    // allow the parts one at a time, smallest first (each sequence is counted once, in sorted order)
    for (int p = 1; p <= n; p++) {
        // sums from small to large, so part p may be used again and again
        for (int s = p; s <= n; s++) ways[s] += ways[s - p];
    }
    cout << ways[n] << "\n";
}
