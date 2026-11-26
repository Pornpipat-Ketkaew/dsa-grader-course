#include <iostream>
#include <map>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    // owned[start] = end of one bought block. Invariant after every purchase:
    // blocks are disjoint, sorted by start, and never touching (a free cell separates them).
    // Then the minimum number of intervals to report is simply owned.size().
    map<int, int> owned;

    int actionCount;
    cin >> actionCount;
    // action = 0..actionCount-1, processed in input order
    for (int action = 0; action < actionCount; action++) {
        int type;
        cin >> type;
        if (type == 2) {
            cout << owned.size() << '\n';
            continue;
        }
        int from, to;
        cin >> from >> to;

        // 1) the first block that can overlap or touch [from, to]:
        //    the block starting at or before `from` counts if it reaches from-1 or further
        auto block = owned.upper_bound(from);           // first block starting after `from`
        if (block != owned.begin()) {
            auto before = prev(block);
            if (before->second >= from - 1) block = before;
        }
        // 2) swallow, left to right, every block that starts no later than to+1
        while (block != owned.end() && block->first <= to + 1) {
            from = min(from, block->first);
            to = max(to, block->second);
            block = owned.erase(block);                  // erase returns the next block
        }
        // 3) store the merged block
        owned[from] = to;
    }
}
