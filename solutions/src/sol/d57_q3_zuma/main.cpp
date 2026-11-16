#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false); cin.tie(0);

    int n, k, v;
    cin >> n >> k >> v;
    vector<int> a(n);
    // i visits 0 .. n-1: read the beads from first to last
    for (int i = 0; i < n; i++) cin >> a[i];

    // We never really insert: the new bead sits "between a[k-1] and a[k]".
    // The final string is always   a[0 .. L]  +  a[R .. n-1]   (with the new bead in the
    // middle only if nothing explodes). L = last kept bead on the left, R = first kept on the right.

    // 1) The run of colour v around the new bead.
    int l = k - 1;                         // l walks LEFT from k-1 while the bead has colour v
    while (l >= 0 && a[l] == v) l--;
    int r = k;                             // r walks RIGHT from k while the bead has colour v
    while (r < n && a[r] == v) r++;
    int run = (k - 1 - l) + (r - k) + 1;   // left part + right part + the new bead

    if (run < 3) {
        // nothing explodes: print a[0..k-1], v, a[k..n-1]
        // i visits 0 .. n (n+1 beads in total); position k is the new bead
        bool first = true;
        for (int i = 0; i <= n; i++) {
            int x = (i < k) ? a[i] : (i == k ? v : a[i - 1]);
            if (!first) cout << ' ';
            cout << x;
            first = false;
        }
        cout << '\n';
        return 0;
    }

    // 2) The run exploded: the two sides slide together. Keep exploding while the two
    //    beads that meet have the SAME colour and that colour now forms a run of >= 3.
    int L = l, R = r;
    while (L >= 0 && R < n && a[L] == a[R]) {
        int c = a[L];
        int l2 = L;                        // l2 walks left over the run of colour c
        while (l2 >= 0 && a[l2] == c) l2--;
        int r2 = R;                        // r2 walks right over the run of colour c
        while (r2 < n && a[r2] == c) r2++;
        if ((L - l2) + (r2 - R) < 3) break;   // they meet, but only 2 beads: no explosion
        L = l2;                            // the whole run disappears
        R = r2;
    }

    // 3) Print a[0..L] then a[R..n-1]. Every bead is visited at most a constant number of times: O(n).
    bool first = true;
    for (int i = 0; i <= L; i++) {         // i visits 0 .. L (left part, left to right)
        if (!first) cout << ' ';
        cout << a[i];
        first = false;
    }
    for (int i = R; i < n; i++) {          // i visits R .. n-1 (right part, left to right)
        if (!first) cout << ' ';
        cout << a[i];
        first = false;
    }
    cout << '\n';
}
