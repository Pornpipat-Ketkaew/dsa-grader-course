#include <iostream>
#include <vector>
using namespace std;

// Fill v[top .. top+size-1][left .. left+size-1] with H(a, b), where size = 2^a.
void recur(vector<vector<int>> &v, int a, int b, int top, int left) {
    if (a == 0) {                      // base case: H(0, b) is the 1 x 1 matrix [b]
        v[top][left] = b;
        return;
    }
    int h = 1 << (a - 1);              // side length of each quarter
    recur(v, a - 1, b,     top,     left);      // top-left     = H(a-1, b)
    recur(v, a - 1, b - 1, top,     left + h);  // top-right    = H(a-1, b-1)
    recur(v, a - 1, b + 1, top + h, left);      // bottom-left  = H(a-1, b+1)
    recur(v, a - 1, b,     top + h, left + h);  // bottom-right = H(a-1, b)
}

int main() {
    int a, b;
    cin >> a >> b;
    int n = 1 << a;                    // the matrix is 2^a x 2^a
    vector<vector<int>> v(n, vector<int>(n));
    recur(v, a, b, 0, 0);
    // print row 0 .. n-1, and inside each row column 0 .. n-1
    for (int r = 0; r < n; r++) {
        for (int c = 0; c < n; c++) {
            if (c > 0) cout << ' ';
            cout << v[r][c];
        }
        cout << '\n';
    }
}
