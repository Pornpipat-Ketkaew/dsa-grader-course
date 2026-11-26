#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

const int MOD = 32717;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    int k, n;
    cin >> k >> n;
    vector<int> coefficient(k + 1);                  // coefficient[1..k] = c1..ck
    vector<int> value(max(n, k - 1) + 1);            // value[index] = R(index) mod 32717
    // index = 1..k: the coefficients c1..ck
    for (int index = 1; index <= k; index++) cin >> coefficient[index];
    // index = 0..k-1: the starting values a0..a(k-1), reduced right away
    for (int index = 0; index < k; index++) {
        cin >> value[index];
        value[index] %= MOD;
    }
    // index = k..n (increasing): every R(index) needs the k values just before it
    for (int index = k; index <= n; index++) {
        long long sum = 0;
        // back = 1..k: add c_back * R(index - back)
        for (int back = 1; back <= k; back++)
            sum = (sum + (long long)coefficient[back] * value[index - back]) % MOD;
        value[index] = sum;
    }
    cout << value[n] << '\n';
}
