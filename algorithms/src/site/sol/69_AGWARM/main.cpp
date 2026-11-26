#include <iostream>
#include <vector>
using namespace std;

const int WALL_TOP = 1, WALL_RIGHT = 2;      // bits of a cell's number

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int rows, cols;
    cin >> rows >> cols;
    vector<vector<int>> border(rows, vector<int>(cols));
    // row = 0..rows-1, col = 0..cols-1: read the grid top to bottom
    for (int row = 0; row < rows; row++)
        for (int col = 0; col < cols; col++) cin >> border[row][col];

    // Each wall is stored once: the wall between (row, col) and the cell above
    // is bit 1 of (row, col); the wall to the right is bit 2 of (row, col).
    // So the wall BELOW a cell is bit 1 of the cell under it, and the wall to
    // its LEFT is bit 2 of the cell on its left.
    vector<vector<bool>> colored(rows, vector<bool>(cols, false));
    vector<pair<int, int>> stack;
    int colors = 0;
    // row, col = every cell in reading order: an uncolored cell starts a new region
    for (int row = 0; row < rows; row++) {
        for (int col = 0; col < cols; col++) {
            if (colored[row][col]) continue;
            colors++;
            colored[row][col] = true;
            stack.push_back({row, col});
            // iterative DFS: paint every cell reachable without crossing a wall
            while (!stack.empty()) {
                auto [r, c] = stack.back();
                stack.pop_back();
                auto visit = [&](int nextRow, int nextCol) {
                    if (colored[nextRow][nextCol]) return;
                    colored[nextRow][nextCol] = true;
                    stack.push_back({nextRow, nextCol});
                };
                if (r > 0 && !(border[r][c] & WALL_TOP)) visit(r - 1, c);                 // up
                if (r + 1 < rows && !(border[r + 1][c] & WALL_TOP)) visit(r + 1, c);      // down
                if (c > 0 && !(border[r][c - 1] & WALL_RIGHT)) visit(r, c - 1);           // left
                if (c + 1 < cols && !(border[r][c] & WALL_RIGHT)) visit(r, c + 1);        // right
            }
        }
    }
    cout << colors << '\n';
}
