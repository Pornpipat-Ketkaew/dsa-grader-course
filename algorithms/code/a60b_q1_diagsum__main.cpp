#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    vector<vector<int>> table(n, vector<int>(n));
    // row = 0..n-1 (top to bottom), column = 0..n-1 (left to right)
    for (int row = 0; row < n; row++)
        for (int column = 0; column < n; column++) cin >> table[row][column];

    // A "diagonal sum" is a contiguous piece of one down-right diagonal.
    // Every cell on a diagonal has the same shift = column - row, from -(n-1) to n-1.
    // For each diagonal, the best piece is a maximum subarray: Kadane's algorithm.
    int best = table[0][0];

    // shift = -(n-1), ..., n-1: one iteration per diagonal (bottom-left corner to top-right corner)
    for (int shift = -(n - 1); shift <= n - 1; shift++) {
        int row = max(0, -shift);               // top-left end of this diagonal
        int column = row + shift;
        int bestEndingHere = table[row][column];   // best piece that ENDS at the current cell
        best = max(best, bestEndingHere);

        // walk down-right: (row+1, column+1), ... while both stay inside the table
        for (row++, column++; row < n && column < n; row++, column++) {
            // extend the best piece ending at the previous cell, or start a new piece here
            bestEndingHere = max(table[row][column], bestEndingHere + table[row][column]);
            best = max(best, bestEndingHere);
        }
    }
    cout << best << '\n';
}
