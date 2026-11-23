#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    string s;
    cin >> n >> s;
    // L[i][j] = longest palindromic subsequence of s[i..j]
    // only rows i and i+1 are needed, so keep two rows: cur = row i, nxt = row i+1
    vector<int> cur(n, 0), nxt(n, 0);
    // i from right to left, because row i is built from row i+1 (int: counting down)
    for (int i = n - 1; i >= 0; i--) {
        cur[i] = 1;                           // one letter is a palindrome
        // j from left to right, because L[i][j] also uses L[i][j-1]
        for (int j = i + 1; j < n; j++) {
            if (s[i] == s[j]) cur[j] = (j == i + 1 ? 0 : nxt[j - 1]) + 2;   // wrap the inside with s[i], s[j]
            else cur[j] = max(nxt[j], cur[j - 1]);                         // drop s[i] or drop s[j]
        }
        swap(cur, nxt);                       // row i becomes "the row below" for i-1
    }
    cout << nxt[n - 1] << "\n";
}
