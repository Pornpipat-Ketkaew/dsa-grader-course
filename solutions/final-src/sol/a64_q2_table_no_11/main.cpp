#include <iostream>
using namespace std;

const long long MOD = 100000007;

int main() {
    int n;
    cin >> n;
    // A column has 2 cells (top, bottom). "11" in one column is forbidden,
    // so a column is one of three states:
    //   e = 00 (empty), t = 1 on top only, b = 1 on bottom only.
    // e, t, b = number of valid tables of the current length whose LAST column is that state.
    long long e = 1, t = 1, b = 1;          // length 1: one table per state
    // add columns 2, 3, ..., n one at a time
    for (int col = 2; col <= n; col++) {
        long long ne = (e + t + b) % MOD;   // 00 may follow anything
        long long nt = (e + b) % MOD;       // top 1 cannot follow a top 1
        long long nb = (e + t) % MOD;       // bottom 1 cannot follow a bottom 1
        e = ne; t = nt; b = nb;
    }
    cout << (e + t + b) % MOD << "\n";
}
