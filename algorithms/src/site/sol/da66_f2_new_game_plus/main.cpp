#include <iostream>
#include <vector>
using namespace std;

const int MOD = 100000007;
const int START = 3;                       // "entered without a door" (the first column)
const int ROW_STEP[3] = {-1, 0, +1};       // doors X (up-right), Y (right), Z (down-right)

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    int rows, columns;
    cin >> rows >> columns;
    vector<vector<int>> blocked(rows, vector<int>(columns));
    // row = 0..rows-1, column = 0..columns-1: the map, top row first
    for (int row = 0; row < rows; row++)
        for (int column = 0; column < columns; column++) cin >> blocked[row][column];

    // ways[row][door] = room lists that end in room (row, current column), entered by `door`
    vector<vector<long long>> ways(rows, vector<long long>(4, 0)), next;
    // row = 0..rows-1: the game may start in any open room of the first column
    for (int row = 0; row < rows; row++)
        if (!blocked[row][0]) ways[row][START] = 1;
    // column = 0..columns-2 (left to right): move every list one column to the right
    for (int column = 0; column + 1 < columns; column++) {
        next.assign(rows, vector<long long>(4, 0));
        // row = 0..rows-1, entered = 0..3: every state of this column
        for (int row = 0; row < rows; row++)
            for (int entered = 0; entered < 4; entered++) {
                if (ways[row][entered] == 0) continue;
                // door = X, Y, Z: any door except the one we just came through
                for (int door = 0; door < 3; door++) {
                    if (door == entered) continue;
                    int nextRow = row + ROW_STEP[door];
                    if (nextRow < 0 || nextRow >= rows || blocked[nextRow][column + 1]) continue;
                    next[nextRow][door] = (next[nextRow][door] + ways[row][entered]) % MOD;
                }
            }
        ways.swap(next);
    }
    long long total = 0;
    // row = 0..rows-1, entered = 0..3: every way to stand in the last column
    for (int row = 0; row < rows; row++)
        for (int entered = 0; entered < 4; entered++) total = (total + ways[row][entered]) % MOD;
    cout << total << '\n';
}
