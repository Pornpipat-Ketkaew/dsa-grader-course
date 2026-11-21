#include <iostream>
#include <vector>
using namespace std;

const int MOD = 32717;

int main() {
    int k, n;
    cin >> k >> n;
    vector<int> c(k + 1), R(max(n, k - 1) + 1);
    // c[1] .. c[k]: the coefficients
    for (int i = 1; i <= k; i++) cin >> c[i];
    // R[0] .. R[k-1] = a[0] .. a[k-1]: the starting values (reduced mod 32717)
    for (int i = 0; i < k; i++) { cin >> R[i]; R[i] %= MOD; }
    // Bottom-up DP: R[i] for i = k, k+1, ..., n, each from the k values before it
    for (int i = k; i <= n; i++) {
        long long sum = 0;
        // j = 1 .. k: add c[j] * R[i-j]
        for (int j = 1; j <= k; j++) sum = (sum + (long long)c[j] * R[i - j]) % MOD;
        R[i] = sum;
    }
    cout << R[n] << "\n";
}
