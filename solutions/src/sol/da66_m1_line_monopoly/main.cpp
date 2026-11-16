#include <iostream>
#include <map>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    // owned: start -> end of every bought block. Invariant kept after every purchase:
    //   blocks are disjoint, sorted by start, and NOT touching (between two blocks
    //   there is at least one unbought cell). Then the answer is simply owned.size().
    map<int, int> owned;
    int n;
    cin >> n;
    for (int t = 0; t < n; t++) {
        int type;
        cin >> type;
        if (type == 2) {
            cout << owned.size() << "\n";
            continue;
        }
        long long a, b;                    // long long so that a - 1 and b + 1 never overflow
        cin >> a >> b;

        // 1) find the first block that could touch [a, b]:
        //    the block just before a also touches if its end >= a - 1.
        auto it = owned.upper_bound((int)a);          // first block starting AFTER a
        if (it != owned.begin()) {
            auto prev = it;
            prev--;                                    // the last block starting at or before a
            if (prev->second >= a - 1) it = prev;      // it overlaps or touches [a, b]
        }
        // 2) swallow every block that overlaps or touches [a, b] (start <= b + 1)
        while (it != owned.end() && it->first <= b + 1) {
            if (it->first < a)  a = it->first;         // grow the new block to cover it
            if (it->second > b) b = it->second;
            it = owned.erase(it);                      // erase returns the next block
        }
        // 3) store the merged block
        owned[(int)a] = (int)b;
    }
}
