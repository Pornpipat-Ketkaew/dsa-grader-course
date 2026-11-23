#include <iostream>
using namespace std;

const long long MOD = 100000007;

// can the three cells x, y, z (in a row) sit next to each other?
// a 1 and a 2 may not be at distance 1 or 2
bool ok3(int x, int y, int z) {
    auto clash = [](int a, int b) { return (a == 1 && b == 2) || (a == 2 && b == 1); };
    return !clash(x, y) && !clash(y, z) && !clash(x, z);
}

int main() {
    int n;
    cin >> n;
    if (n == 1) { cout << 3 << "\n"; return 0; }
    // f[x][y] = number of valid arrays of the current length whose last two cells are x, y
    long long f[3][3];
    // length 2: any pair except 1-2 and 2-1
    for (int x = 0; x < 3; x++)
        for (int y = 0; y < 3; y++)
            f[x][y] = ok3(0, x, y) ? 1 : 0;   // a leading 0 changes nothing
    // grow the array from length len-1 to len, for len = 3 .. n
    for (int len = 3; len <= n; len++) {
        long long g[3][3] = {};
        // old last two cells x, y and the new cell z
        for (int x = 0; x < 3; x++)
            for (int y = 0; y < 3; y++)
                for (int z = 0; z < 3; z++)
                    if (ok3(x, y, z)) g[y][z] = (g[y][z] + f[x][y]) % MOD;
        // copy the new row back
        for (int y = 0; y < 3; y++)
            for (int z = 0; z < 3; z++) f[y][z] = g[y][z];
    }
    long long total = 0;
    // add up every ending
    for (int x = 0; x < 3; x++)
        for (int y = 0; y < 3; y++) total = (total + f[x][y]) % MOD;
    cout << total << "\n";
}
