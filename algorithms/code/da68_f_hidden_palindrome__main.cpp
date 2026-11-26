#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    string letters;
    cin >> n >> letters;
    // best(left, right) = longest palindromic subsequence of letters[left..right].
    // Row `left` needs only row left+1, so keep two rows:
    //   below[right] = best(left + 1, right),  row[right] = best(left, right)
    vector<int> below(n, 0), row(n, 0);
    // left = n-1 down to 0 (right to left, int because it counts down past 0)
    for (int left = n - 1; left >= 0; left--) {
        row[left] = 1;                                   // a single letter is a palindrome
        // right = left+1..n-1 (left to right): row[right-1] is needed and already done
        for (int right = left + 1; right < n; right++) {
            if (letters[left] == letters[right])         // wrap the inside with both ends
                row[right] = (right == left + 1 ? 0 : below[right - 1]) + 2;
            else                                         // drop the left end or the right end
                row[right] = max(below[right], row[right - 1]);
        }
        swap(row, below);                                // this row is "below" for left - 1
    }
    cout << below[n - 1] << '\n';
}
