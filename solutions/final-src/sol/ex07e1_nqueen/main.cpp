#include <iostream>
using namespace std;

int n, ways = 0;
bool colUsed[12], diag1[23], diag2[23];  // diag1 index r + c, diag2 index r - c + n - 1

// place one queen in each row r, r+1, ..., n-1
void place(int r) {
    if (r == n) { ways++; return; }          // all n rows have a queen: one more solution
    // try every column of row r
    for (int c = 0; c < n; c++) {
        if (colUsed[c] || diag1[r + c] || diag2[r - c + n - 1]) continue;   // attacked
        colUsed[c] = diag1[r + c] = diag2[r - c + n - 1] = true;
        place(r + 1);
        colUsed[c] = diag1[r + c] = diag2[r - c + n - 1] = false;           // undo
    }
}

int main() {
    cin >> n;
    place(0);
    cout << ways << "\n";
}
