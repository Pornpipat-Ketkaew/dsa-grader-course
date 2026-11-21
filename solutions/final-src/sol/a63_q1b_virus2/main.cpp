#include <iostream>
#include <vector>
using namespace std;

vector<int> s;   // the code being checked

// Checks s[l .. r-1]. Returns the number of 1s in it if it is a valid
// DIVOC-20 virus, or -1 if it is not.
// Returning the count lets the parent compare the two halves for free.
int check(int l, int r) {
    if (r - l == 2) return s[l] + s[l + 1];     // every 2-digit code is valid
    int mid = (l + r) / 2;
    int a = check(l, mid);                       // left half
    if (a < 0) return -1;
    int b = check(mid, r);                       // right half
    if (b < 0) return -1;
    if (a - b > 1 || b - a > 1) return -1;       // the joining rule: counts differ by at most 1
    return a + b;
}

int main() {
    int n, k;
    cin >> n >> k;
    int len = 1 << k;
    s.resize(len);
    // check the n codes one by one
    for (int t = 0; t < n; t++) {
        // read the 2^k digits s[0] .. s[len-1]
        for (int i = 0; i < len; i++) cin >> s[i];
        cout << (check(0, len) >= 0 ? "yes" : "no") << "\n";
    }
}
