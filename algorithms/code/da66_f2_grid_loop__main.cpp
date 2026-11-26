#include <iostream>
#include <vector>
using namespace std;

// directions: 0 = up, 1 = right, 2 = down, 3 = left
const int ROW_STEP[4] = {-1, 0, 1, 0}, COL_STEP[4] = {0, 1, 0, -1};
// EXITS[type] = the two sides road type 1..6 opens to
const int EXITS[7][2] = {
    {0, 0},     // (unused)
    {3, 1},     // 1: left - right
    {0, 2},     // 2: up - down
    {0, 1},     // 3: up - right
    {1, 2},     // 4: right - down
    {2, 3},     // 5: down - left
    {3, 0},     // 6: left - up
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int rows, cols;
    cin >> rows >> cols;
    vector<int> type(rows * cols);             // type[row * cols + col]
    // index = 0..rows*cols-1 in reading order
    for (int index = 0; index < rows * cols; index++) cin >> type[index];

    auto opensTo = [&](int index, int side) {
        return EXITS[type[index]][0] == side || EXITS[type[index]][1] == side;
    };

    // Two cells are connected when each opens toward the other. Every cell has
    // 2 exits, so every cell has at most 2 connections: each component is a
    // path or a loop, and it is a loop exactly when every cell in it has both
    // exits connected. One traversal per component checks that.
    vector<bool> visited(rows * cols, false);
    vector<int> stack;
    int loops = 0, longest = 0;
    // start = every cell in reading order: an unvisited cell opens a new component
    for (int start = 0; start < rows * cols; start++) {
        if (visited[start]) continue;
        int cells = 0;
        bool everyExitConnected = true;
        visited[start] = true;
        stack.push_back(start);
        // iterative DFS over the component
        while (!stack.empty()) {
            int index = stack.back();
            stack.pop_back();
            cells++;
            int row = index / cols, col = index % cols;
            // exit = the cell's two open sides
            for (int exit = 0; exit < 2; exit++) {
                int side = EXITS[type[index]][exit];
                int nextRow = row + ROW_STEP[side], nextCol = col + COL_STEP[side];
                int next = nextRow * cols + nextCol;
                bool connected = nextRow >= 0 && nextRow < rows && nextCol >= 0 && nextCol < cols
                                 && opensTo(next, (side + 2) % 4);   // must open back toward us
                if (!connected) {
                    everyExitConnected = false;      // a dead end: this component is a path
                    continue;
                }
                if (!visited[next]) {
                    visited[next] = true;
                    stack.push_back(next);
                }
            }
        }
        if (everyExitConnected) {
            loops++;
            longest = max(longest, cells);
        }
    }
    if (loops == 0) cout << 0 << '\n';
    else cout << loops << ' ' << longest << '\n';
}
