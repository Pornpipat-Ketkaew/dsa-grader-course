#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    int bossCount, dungeonCount, typeCount;
    long long power;
    cin >> bossCount >> dungeonCount >> power >> typeCount;
    vector<vector<int>> costOfType(typeCount);    // tiredness of every dungeon giving that item type
    // dungeon = 0..dungeonCount-1: file each dungeon under its item type
    for (int dungeon = 0; dungeon < dungeonCount; dungeon++) {
        int tiredness, type;
        cin >> tiredness >> type;
        costOfType[type].push_back(tiredness);
    }
    // type = 0..typeCount-1: cheapest dungeon of each type first
    for (int type = 0; type < typeCount; type++) sort(costOfType[type].begin(), costOfType[type].end());
    vector<int> nextUnused(typeCount, 0);         // costOfType[type][nextUnused[type]] = cheapest unexplored

    // boss = 0..bossCount-1: bosses must be beaten in this order
    for (int boss = 0; boss < bossCount; boss++) {
        int itemCount;
        cin >> itemCount;
        // item = 0..itemCount-1: every item is used up by this boss, so each needs a new dungeon
        for (int item = 0; item < itemCount; item++) {
            int type;
            cin >> type;
            if (nextUnused[type] == (int)costOfType[type].size()) {   // no dungeon left for it
                cout << boss << '\n';
                return 0;
            }
            power -= costOfType[type][nextUnused[type]++];           // explore the cheapest one
            if (power < 0) {                                          // too tired to finish this boss
                cout << boss << '\n';
                return 0;
            }
        }
    }
    cout << bossCount << '\n';
}
