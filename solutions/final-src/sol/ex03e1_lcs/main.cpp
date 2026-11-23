#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    string a, b;
    cin >> a >> b;
    int n = a.size(), m = b.size();
    // L[i][j] = length of an LCS of the first i letters of a and the first j letters of b
    vector<vector<int>> L(n + 1, vector<int>(m + 1, 0));
    // fill row by row; row 0 and column 0 stay 0 (an empty prefix has no common letters)
    for (int i = 1; i <= n; i++) {
        // every prefix length j of b
        for (int j = 1; j <= m; j++) {
            if (a[i - 1] == b[j - 1]) L[i][j] = L[i - 1][j - 1] + 1;   // both last letters match: use them
            else L[i][j] = max(L[i - 1][j], L[i][j - 1]);            // drop the last letter of a or of b
        }
    }
    cout << L[n][m] << "\n";
}
