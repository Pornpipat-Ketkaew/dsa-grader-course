#include <iostream>
#include <vector>
using namespace std;

const int MOD = 1000003;

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> S(k);
    // read the k allowed piece sizes
    for (int j = 0; j < k; j++) cin >> S[j];

    // ways[i] = number of different ways to eat a bar of exactly i pieces.
    // The LAST day eats some s from S, leaving a bar of i - s pieces:
    //     ways[i] = sum over s in S with s <= i of ways[i - s]
    // ways[0] = 1: an empty bar is finished in exactly one way (eat nothing more).
    vector<int> ways(n + 1, 0);
    ways[0] = 1;
    // i = 1 .. n, increasing, so every ways[i - s] we need is already final
    for (int i = 1; i <= n; i++) {
        // try every allowed size for the last day
        for (int j = 0; j < k; j++) {
            if (S[j] <= i) ways[i] = (ways[i] + ways[i - S[j]]) % MOD;
        }
    }
    cout << ways[n] << "\n";
}
