#include <iostream>
#include <vector>
using namespace std;

vector<vector<int>> matrix;

// Write H(level, value) into the square block whose top-left corner is (top, left)
// and whose side is 2^level.
void build(int level, int value, int top, int left) {
    if (level == 0) {                                   // H(0, value) = [value]
        matrix[top][left] = value;
        return;
    }
    int half = 1 << (level - 1);                        // side of each quarter
    build(level - 1, value,     top,        left);         // top-left     = H(level-1, value)
    build(level - 1, value - 1, top,        left + half);  // top-right    = H(level-1, value-1)
    build(level - 1, value + 1, top + half, left);         // bottom-left  = H(level-1, value+1)
    build(level - 1, value,     top + half, left + half);  // bottom-right = H(level-1, value)
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    int a, b;
    cin >> a >> b;
    int side = 1 << a;
    matrix.assign(side, vector<int>(side));
    build(a, b, 0, 0);
    // row = 0..side-1 (top to bottom), column = 0..side-1 (left to right)
    for (int row = 0; row < side; row++) {
        for (int column = 0; column < side; column++) {
            if (column > 0) cout << ' ';
            cout << matrix[row][column];
        }
        cout << '\n';
    }
}
