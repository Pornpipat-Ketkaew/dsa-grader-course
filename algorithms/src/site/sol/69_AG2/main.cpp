#include <iostream>
using namespace std;

const long long MOD = 1000000007;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    if (n % 2 == 1) {                       // 3 * n cells is odd: dominoes cannot cover it
        cout << 0 << '\n';
        return 0;
    }
    // full  = F(width) : ways to tile a full 3 x width board
    // notch = G(width) : ways to tile a 3 x width board whose top-right cell is
    //                    missing (the bottom-right one gives the same count)
    // F(w) = F(w - 2) + 2 * G(w - 1)   last column: three horizontals, or a vertical
    //                                  in the top or bottom two cells (see the page)
    // G(w) = F(w - 1) + G(w - 2)       last column's two cells: one vertical, or
    //                                  two horizontals (forcing one more on top)
    long long full = 1, notch = 0;          // F(0) = 1 (empty board), G(-1) = 0
    // width = 2, 4, ..., n (left to right): only even widths can be full
    for (int width = 2; width <= n; width += 2) {
        notch = (full + notch) % MOD;       // G(width - 1) = F(width - 2) + G(width - 3)
        full = (full + 2 * notch) % MOD;    // F(width)     = F(width - 2) + 2 G(width - 1)
    }
    cout << full << '\n';
}
