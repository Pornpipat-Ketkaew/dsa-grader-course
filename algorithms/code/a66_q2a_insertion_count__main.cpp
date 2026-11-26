#include <iostream>
#include <vector>
using namespace std;

// Fenwick tree (binary indexed tree) over the VALUES 1..n.
// seenCount[...] stores partial counts so that "how many seen values are <= v" takes O(log n).
int n;
vector<int> seenCount;

void markSeen(int value) {
    // node = value, then climb: node += lowbit(node), visiting every cell whose range covers value
    for (int node = value; node <= n; node += node & (-node)) seenCount[node]++;
}

int countSeenAtMost(int value) {
    // node = value, then descend: node -= lowbit(node); the visited ranges tile 1..value exactly
    int total = 0;
    for (int node = value; node > 0; node -= node & (-node)) total += seenCount[node];
    return total;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int queryCount;
    cin >> n >> queryCount;
    seenCount.assign(n + 1, 0);

    // shiftsOf[value] = how many elements LEFT of value are LARGER than it
    //                 = how many times line 07 moves this value one cell to the left
    vector<int> shiftsOf(n + 1);

    // index = 0, 1, ..., n-1 (left to right): before marking A[index], exactly `index`
    // values are seen, all of them to its left; those not <= A[index] are larger.
    for (int index = 0; index < n; index++) {
        int value;
        cin >> value;
        shiftsOf[value] = index - countSeenAtMost(value);
        markSeen(value);
    }

    // answer every query in O(1) from the precomputed table
    for (int query = 0; query < queryCount; query++) {
        int value;
        cin >> value;
        cout << shiftsOf[value] << '\n';
    }
}
