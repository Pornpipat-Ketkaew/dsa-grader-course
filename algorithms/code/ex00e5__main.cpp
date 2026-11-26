#include <iostream>
#include <string>
using namespace std;

int length, runNeeded;
string bits;         // the n-bit string being built
string output;       // up to 2^20 lines, printed once at the end

// position   = number of bits already decided (bits[0..position-1])
// currentRun = length of the block of '1's ending at position-1 (0 if that bit is '0')
// found      = did bits[0..position-1] already contain runNeeded consecutive '1's?
void generate(int position, int currentRun, bool found) {
    if (position == length) {
        if (found) { output += bits; output += '\n'; }
        return;
    }
    // '0' before '1' at every position = increasing numeric order of the whole string
    bits[position] = '0';
    generate(position + 1, 0, found);                       // a '0' breaks the run
    bits[position] = '1';
    generate(position + 1, currentRun + 1, found || currentRun + 1 >= runNeeded);
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cin >> length >> runNeeded;
    bits.assign(length, '0');
    generate(0, 0, runNeeded == 0);      // k = 0: every string qualifies
    cout << output;
}
