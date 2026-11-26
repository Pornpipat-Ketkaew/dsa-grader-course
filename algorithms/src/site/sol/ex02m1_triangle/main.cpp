#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    int levels;
    cin >> levels;
    vector<vector<int>> triangle(levels);
    // level = 0..levels-1 (top to bottom): level has level+1 numbers
    for (int level = 0; level < levels; level++) {
        triangle[level].resize(level + 1);
        // position = 0..level (left to right)
        for (int position = 0; position <= level; position++) cin >> triangle[level][position];
    }
    // best[position] = largest sum of a route from (level, position) down to the bottom.
    // It starts as the bottom level itself.
    vector<int> best(triangle[levels - 1]);
    // level = levels-2 down to 0 (bottom-up, int because it counts down past 0)
    for (int level = levels - 2; level >= 0; level--) {
        // position = 0..level (left to right): best[position] and best[position+1] still hold
        // the level below, because best[position] is overwritten only after it is read
        for (int position = 0; position <= level; position++)
            best[position] = triangle[level][position] + max(best[position], best[position + 1]);
    }
    cout << best[0] << '\n';
}
