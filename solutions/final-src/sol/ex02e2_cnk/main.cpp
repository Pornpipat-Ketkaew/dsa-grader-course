#include <iostream>
using namespace std;

long long memo[31][31];     // memo[n][k] = C(n, k) once computed, 0 = not yet (C is never 0 here)

// The recursive definition from the PDF, with memoization.
long long C(int n, int k) {
    if (k == 0 || k == n) return 1;
    if (memo[n][k] != 0) return memo[n][k];
    return memo[n][k] = C(n - 1, k - 1) + C(n - 1, k);
}

int main() {
    int n, k;
    cin >> n >> k;
    cout << C(n, k) << "\n";
}
