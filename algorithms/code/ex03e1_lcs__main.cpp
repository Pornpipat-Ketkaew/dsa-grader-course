#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    string first, second;
    cin >> first >> second;
    int firstLength = first.size(), secondLength = second.size();
    // lcs[i][j] = LCS length of the first i letters of `first` and the first j letters of `second`
    // row 0 and column 0 stay 0: an empty prefix has nothing in common
    vector<vector<int>> lcs(firstLength + 1, vector<int>(secondLength + 1, 0));
    // i = 1..firstLength (top to bottom): row i needs row i-1
    for (int i = 1; i <= firstLength; i++) {
        // j = 1..secondLength (left to right): also needs lcs[i][j-1]
        for (int j = 1; j <= secondLength; j++) {
            if (first[i - 1] == second[j - 1]) lcs[i][j] = lcs[i - 1][j - 1] + 1;  // match both last letters
            else lcs[i][j] = max(lcs[i - 1][j], lcs[i][j - 1]);                  // drop one last letter
        }
    }
    cout << lcs[firstLength][secondLength] << '\n';
}
