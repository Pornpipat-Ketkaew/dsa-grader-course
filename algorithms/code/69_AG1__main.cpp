#include <iostream>
#include <string>
using namespace std;

int length, kinds;
int remaining[26];          // remaining[bead] = beads of this letter still unused
string bracelet;            // the beads placed so far (filled left to right)
string output;
int found = 0;

void place(int position) {
    if (position == length) {
        // A flipped copy of this bracelet is also generated somewhere; keep only
        // the copy that comes first, i.e. the one that is <= its reverse.
        // index = 0..length/2-1 (outside in): the first mismatching pair decides
        for (int index = 0; index < length / 2; index++) {
            char left = bracelet[index], right = bracelet[length - 1 - index];
            if (left < right) break;            // smaller than the reverse: keep
            if (left > right) return;           // the reverse comes first: skip
        }
        found++;
        output += bracelet;
        output += '\n';
        return;
    }
    // bead = 'A'.. in increasing order, so bracelets come out in dictionary order
    for (int bead = 0; bead < kinds; bead++) {
        if (remaining[bead] == 0) continue;
        remaining[bead]--;
        bracelet[position] = char('A' + bead);
        place(position + 1);
        remaining[bead]++;                      // un-choose
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    cin >> length >> kinds;
    // bead = 0..kinds-1: every count is a single digit (c <= N <= 9), and the
    // digits may be written without spaces, so read them one character at a time
    for (int bead = 0; bead < kinds; bead++) {
        char digit;
        cin >> digit;
        remaining[bead] = digit - '0';
    }
    bracelet.assign(length, ' ');
    place(0);
    cout << found << '\n' << output;
}
