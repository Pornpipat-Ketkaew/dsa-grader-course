#include <cstdio>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<vector<int>> A(n, vector<int>(n));
    // read row r = 0 .. n-1, column c = 0 .. n-1
    for (int r = 0; r < n; r++)
        for (int c = 0; c < n; c++)
            if (scanf("%d", &A[r][c]) != 1) return 0;

    // A "diagonal sum" is the sum of a contiguous piece of one diagonal
    // (cells (i,j), (i+1,j+1), ...). So: for every diagonal, find its best
    // contiguous piece = maximum subarray, solved with Kadane's DP.
    // A diagonal is fixed by d = c - r, which ranges over -(n-1) .. n-1.
    int best = A[0][0];
    for (int d = -(n - 1); d <= n - 1; d++) {
        int r = max(0, -d), c = r + d;      // first cell of this diagonal (top-left end)
        // endHere = best sum of a piece that ENDS at the current cell
        int endHere = 0;
        bool first = true;
        // walk down-right along the diagonal while still inside the table
        while (r < n && c < n) {
            // either extend the best piece ending at the previous cell, or start fresh here
            endHere = first ? A[r][c] : max(A[r][c], endHere + A[r][c]);
            first = false;
            best = max(best, endHere);
            r++; c++;
        }
    }
    printf("%d\n", best);
}
