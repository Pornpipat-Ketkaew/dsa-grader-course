#include <iostream>
#include <string>
using namespace std;

const int NONE = -1;
int n;
int mustComeAfter[20];    // mustComeAfter[b] = a when the rule "a before b" exists, else NONE
                          // (every b appears in at most one rule, so one slot is enough)
bool used[20];            // used[value] = value is already placed
int permutation[20];      // permutation[0..position-1] = values placed so far
string output;

void generate(int position) {
    if (position == n) {                      // complete, and every rule was checked on the way
        // index = 0..n-1: write the permutation left to right
        for (int index = 0; index < n; index++) {
            output += to_string(permutation[index]);
            output += (index + 1 < n ? ' ' : '\n');
        }
        return;
    }
    // value = 0, 1, ..., n-1 in increasing order -> permutations appear in lexicographic order
    for (int value = 0; value < n; value++) {
        if (used[value]) continue;
        // pruning: `value` may be placed only after the number that must precede it
        if (mustComeAfter[value] != NONE && !used[mustComeAfter[value]]) continue;
        used[value] = true;                   // choose
        permutation[position] = value;
        generate(position + 1);               // explore
        used[value] = false;                  // un-choose
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    int ruleCount;
    cin >> n >> ruleCount;
    for (int value = 0; value < n; value++) mustComeAfter[value] = NONE;
    // rule = 0..ruleCount-1: "before" must appear earlier than "after"
    for (int rule = 0; rule < ruleCount; rule++) {
        int before, after;
        cin >> before >> after;
        mustComeAfter[after] = before;
    }
    generate(0);
    cout << output;
}
