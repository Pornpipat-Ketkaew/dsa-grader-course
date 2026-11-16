#include <iostream>
#include <string>
using namespace std;

int n, k;
string cur;      // the n-bit string being built
string out;      // all answers, printed once at the end (up to 2^20 lines)

// pos  = how many bits are decided (cur[0 .. pos-1])
// run  = length of the block of '1's that ends at position pos-1 (0 if the last bit is '0')
// ok   = have we ALREADY seen k consecutive '1's somewhere in cur[0 .. pos-1]?
void gen(int pos, int run, bool ok) {
    if (pos == n) {
        if (ok) { out += cur; out += '\n'; }
        return;
    }
    // '0' first, then '1': this visits the strings in increasing numeric order
    cur[pos] = '0';
    gen(pos + 1, 0, ok);                          // a '0' breaks the current run
    cur[pos] = '1';
    gen(pos + 1, run + 1, ok || run + 1 >= k);    // a '1' extends it; reaching k sets ok forever
}

int main() {
    ios_base::sync_with_stdio(false); cin.tie(0);
    cin >> n >> k;
    cur.assign(n, '0');
    gen(0, 0, k == 0);                            // k = 0: every string qualifies (a run of 0 ones always exists)
    cout << out;
}
