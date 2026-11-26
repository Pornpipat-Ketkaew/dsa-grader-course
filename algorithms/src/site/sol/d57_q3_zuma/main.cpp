#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, insertAt, shotColor;
    cin >> n >> insertAt >> shotColor;
    vector<int> beads(n);
    for (int index = 0; index < n; index++) cin >> beads[index];

    // The new bead sits between beads[insertAt-1] and beads[insertAt]; we never really insert it.
    // Whatever survives is always   beads[0..keepLeft]  +  beads[keepRight..n-1].

    // 1) the run of shotColor around the new bead
    int left = insertAt - 1;            // walk LEFT from insertAt-1 over beads of shotColor
    while (left >= 0 && beads[left] == shotColor) left--;
    int right = insertAt;               // walk RIGHT from insertAt over beads of shotColor
    while (right < n && beads[right] == shotColor) right++;
    int runLength = (insertAt - 1 - left) + (right - insertAt) + 1;   // + the shot bead

    bool first = true;
    auto print = [&](int color) { cout << (first ? "" : " ") << color; first = false; };

    if (runLength < 3) {                // no explosion: original beads with the shot in between
        for (int index = 0; index < insertAt; index++) print(beads[index]);
        print(shotColor);
        for (int index = insertAt; index < n; index++) print(beads[index]);
        cout << '\n';
        return 0;
    }

    // 2) the run exploded; the two sides slide together at (left, right).
    //    Keep exploding while the meeting beads share a color AND that color now forms >= 3 beads.
    while (left >= 0 && right < n && beads[left] == beads[right]) {
        int color = beads[left];
        int newLeft = left;             // walk left over the run of `color`
        while (newLeft >= 0 && beads[newLeft] == color) newLeft--;
        int newRight = right;           // walk right over the run of `color`
        while (newRight < n && beads[newRight] == color) newRight++;
        if ((left - newLeft) + (newRight - right) < 3) break;   // they touch, but only 2 beads
        left = newLeft;
        right = newRight;
    }

    // 3) survivors: beads[0..left] then beads[right..n-1], each bead touched O(1) times overall
    for (int index = 0; index <= left; index++) print(beads[index]);
    for (int index = right; index < n; index++) print(beads[index]);
    cout << '\n';
}
