#include <iostream>
#include <string>
using namespace std;

int A, B;
string cur;      // the barcode being built, one character per level of recursion
string out;      // all answers, printed once at the end (fast output)

// pos  = how many characters are already decided (cur[0 .. pos-1])
// ones = how many of them are '1'
void gen(int pos, int ones) {
    if (pos == B) {                       // all B characters chosen
        out += cur;                       // ones == A is guaranteed by the pruning below
        out += '\n';
        return;
    }
    int left = B - pos;                   // characters still to choose
    int needOnes = A - ones;              // '1's still to place
    // put '0' here only if the remaining left-1 places can still hold all needed '1's
    if (needOnes <= left - 1) {
        cur[pos] = '0';
        gen(pos + 1, ones);
    }
    // put '1' here only if we still need a '1'
    if (needOnes > 0) {
        cur[pos] = '1';
        gen(pos + 1, ones + 1);
    }
}

int main() {
    ios_base::sync_with_stdio(false); cin.tie(0);
    cin >> A >> B;
    cur.assign(B, '0');
    gen(0, 0);
    cout << out;
}
