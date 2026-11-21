#include <iostream>
#include <vector>
using namespace std;

vector<int> s;   // the code being checked

bool bw(int l, int r);

// fw(l, r): is s[l .. r-1] a DIVOC virus?
//   size 2 : it must be exactly 0 1
//   larger : s = a + b (two halves), b must be a virus,
//            and a must be a virus OR a reversed virus (the mutation).
bool fw(int l, int r) {
    if (r - l == 2) return s[l] == 0 && s[l + 1] == 1;
    int mid = (l + r) / 2;
    return fw(mid, r) && (fw(l, mid) || bw(l, mid));
}

// bw(l, r): is s[l .. r-1] a REVERSED virus, i.e. read right-to-left it is a virus?
// Reversing a + b gives reverse(b) + reverse(a). So, read backwards:
//   the first half (read backwards) is b and must be a virus, reversed or not;
//   the second half (read backwards) is a and must be a virus.
// Rewriting in terms of s[l..mid-1] and s[mid..r-1] gives the line below.
bool bw(int l, int r) {
    if (r - l == 2) return s[l] == 1 && s[l + 1] == 0;
    int mid = (l + r) / 2;
    return bw(l, mid) && (fw(mid, r) || bw(mid, r));
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
        cout << (fw(0, len) ? "yes" : "no") << "\n";
    }
}
