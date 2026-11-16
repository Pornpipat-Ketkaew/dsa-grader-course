#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false); cin.tie(0);

    int n;
    cin >> n;

    // seen[x] = true once some d_i equals x. Valid x are 1..n, so size n+1 (index 0 unused).
    vector<bool> seen(n + 1, false);
    bool ok = true;

    // i visits 1, 2, ..., n (left to right): read d_i = f(i) and check it.
    // Stopping early with break is safe: after the loop we only print, nothing else is read.
    for (int i = 1; i <= n; i++) {
        long long d;                      // |d| up to 2e9: long long to be safe
        cin >> d;
        if (d < 1 || d > n) { ok = false; break; }   // f(i) is outside A = {1..n}
        if (seen[d])        { ok = false; break; }   // value repeated -> not 1-1
        seen[d] = true;
    }

    // n values, all inside 1..n, no repeats  ->  every value 1..n hit exactly once  ->  onto.
    cout << (ok ? "YES" : "NO") << '\n';
}
