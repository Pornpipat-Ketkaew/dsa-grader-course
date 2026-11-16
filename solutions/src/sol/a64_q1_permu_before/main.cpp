#include <iostream>
#include <string>
#include <vector>
using namespace std;

int n, m;
int pred[20];        // pred[b] = the number that must appear before b, or -1 if none
                     // (each b appears in at most one pair, so one slot is enough)
bool used[20];       // used[v] = v is already placed in the permutation
int perm[20];        // perm[0 .. pos-1] = the numbers placed so far
string out;

void gen(int pos) {
    if (pos == n) {                                    // a full permutation that obeys every rule
        for (int i = 0; i < n; i++) {                  // i = 0 .. n-1: print left to right
            out += to_string(perm[i]);
            out += (i + 1 < n ? ' ' : '\n');
        }
        return;
    }
    // Try values in increasing order 0, 1, ..., n-1 -> permutations come out in lexicographic order.
    for (int v = 0; v < n; v++) {
        if (used[v]) continue;                         // already in the permutation
        if (pred[v] != -1 && !used[pred[v]]) continue; // its "before" number is not placed yet:
                                                       // putting v here would break the rule -> prune
        used[v] = true;
        perm[pos] = v;
        gen(pos + 1);
        used[v] = false;                               // undo, so the next v can use this position
    }
}

int main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    cin >> n >> m;
    for (int i = 0; i < n; i++) { pred[i] = -1; used[i] = false; }
    for (int i = 0; i < m; i++) {                      // m rules "a before b"
        int a, b;
        cin >> a >> b;
        pred[b] = a;
    }
    gen(0);
    cout << out;
}
