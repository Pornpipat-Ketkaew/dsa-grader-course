#include <iostream>
using namespace std;

int n;
long long ways;                    // global: starts at 0
bool columnUsed[12];
bool diagonalUsed[23];             // "\" diagonal of (row, column) = row - column + n - 1
bool antiDiagonalUsed[23];         // "/" diagonal of (row, column) = row + column

// Exactly one queen per row: rows 0..row-1 already hold a queen each.
void place(int row) {
    if (row == n) { ways++; return; }
    // column = 0..n-1: try every square of this row that no earlier queen attacks
    for (int column = 0; column < n; column++) {
        int diagonal = row - column + n - 1, antiDiagonal = row + column;
        if (columnUsed[column] || diagonalUsed[diagonal] || antiDiagonalUsed[antiDiagonal]) continue;
        columnUsed[column] = diagonalUsed[diagonal] = antiDiagonalUsed[antiDiagonal] = true;    // place
        place(row + 1);
        columnUsed[column] = diagonalUsed[diagonal] = antiDiagonalUsed[antiDiagonal] = false;   // remove
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cin >> n;
    place(0);
    cout << ways << '\n';
}
