#include <iostream>
using namespace std;

long long choose[31][31];                 // choose[n][k] = C(n, k), Pascal's triangle

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, k;
    cin >> n >> k;
    // row = 0..n (top to bottom): a row needs only the row above it
    for (int row = 0; row <= n; row++) {
        choose[row][0] = choose[row][row] = 1;            // C(row, 0) = C(row, row) = 1
        // column = 1..row-1: the two entries above-left and above
        for (int column = 1; column < row; column++)
            choose[row][column] = choose[row - 1][column - 1] + choose[row - 1][column];
    }
    cout << choose[n][k] << '\n';
}
