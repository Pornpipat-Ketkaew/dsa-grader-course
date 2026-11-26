#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, maxValue, target;
    cin >> n >> maxValue >> target;
    int ones = 0;
    // index = 0..n-1: only the number of 1s matters, a 0 always adds nothing
    for (int index = 0; index < n; index++) {
        int bit;
        cin >> bit;
        ones += bit;
    }
    // ways[sum] = ways to fill the 1s handled so far so that they add up to sum
    vector<long long> ways(target + 1, 0);
    ways[0] = 1;                                   // no 1 filled yet: the empty sum
    // filled = 1..ones: replace one more 1 by a value 1..maxValue
    for (int filled = 1; filled <= ones; filled++) {
        vector<long long> next(target + 1, 0);
        // sum = 0..target: extend every sum reached by the previous 1s
        for (int sum = 0; sum <= target; sum++) {
            if (ways[sum] == 0) continue;
            // value = 1..maxValue while the new sum stays within the target
            for (int value = 1; value <= maxValue && sum + value <= target; value++)
                next[sum + value] += ways[sum];
        }
        ways = next;
    }
    cout << ways[target] << '\n';
}
