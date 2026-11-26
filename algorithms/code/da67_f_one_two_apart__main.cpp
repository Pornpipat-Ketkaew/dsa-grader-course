#include <iostream>
using namespace std;

const long long MOD = 100000007;

// a 1 and a 2 clash when they are at distance 1 or 2
bool clash(int a, int b) {
    return (a == 1 && b == 2) || (a == 2 && b == 1);
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    if (n == 1) {                                   // 0, 1, 2
        cout << 3 << '\n';
        return 0;
    }
    // ways[previous][last] = valid arrays of the current length ending with these two values
    long long ways[3][3];
    // previous, last = 0..2: length 2, every pair except 1-2 and 2-1
    for (int previous = 0; previous < 3; previous++)
        for (int last = 0; last < 3; last++) ways[previous][last] = clash(previous, last) ? 0 : 1;
    // length = 3..n: append one value to every array of length length-1
    for (int length = 3; length <= n; length++) {
        long long next[3][3] = {};
        // previous, last = old last two values; value = the new one (all 0..2)
        for (int previous = 0; previous < 3; previous++)
            for (int last = 0; last < 3; last++)
                for (int value = 0; value < 3; value++)
                    if (!clash(previous, value) && !clash(last, value))
                        next[last][value] = (next[last][value] + ways[previous][last]) % MOD;
        // previous, last = 0..2: the new table replaces the old one
        for (int previous = 0; previous < 3; previous++)
            for (int last = 0; last < 3; last++) ways[previous][last] = next[previous][last];
    }
    long long total = 0;
    // previous, last = 0..2: add up every possible ending
    for (int previous = 0; previous < 3; previous++)
        for (int last = 0; last < 3; last++) total = (total + ways[previous][last]) % MOD;
    cout << total << '\n';
}
