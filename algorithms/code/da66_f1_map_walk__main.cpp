#include <iostream>
#include <string>
using namespace std;

int rows, columns;
bool blocked[12][12];     // "no entry" cells (1-based)
bool visited[12][12];     // cells on the current path
string commands;          // the commands that led to the current cell

// The three commands in ALPHABETICAL order: A = right, B = down, C = up.
const char LETTER[3] = {'A', 'B', 'C'};
const int ROW_STEP[3] = {0, +1, -1};
const int COLUMN_STEP[3] = {+1, 0, 0};

// We stand on (row, column) with `commands` describing the path from (1,1).
void walk(int row, int column) {
    if (row == rows && column == columns) {     // the game ends as soon as we reach (R, C)
        cout << commands << '\n';                // print now: storing every path could break 32 MB
        return;
    }
    // move = 0, 1, 2 -> A, B, C: alphabetical order of the letters = sorted output
    for (int move = 0; move < 3; move++) {
        int nextRow = row + ROW_STEP[move];
        int nextColumn = column + COLUMN_STEP[move];
        if (nextRow < 1 || nextRow > rows || nextColumn < 1 || nextColumn > columns) continue; // rule 1
        if (visited[nextRow][nextColumn] || blocked[nextRow][nextColumn]) continue;         // rules 2, 4
        visited[nextRow][nextColumn] = true;     // choose
        commands.push_back(LETTER[move]);
        walk(nextRow, nextColumn);               // explore
        commands.pop_back();                     // un-choose
        visited[nextRow][nextColumn] = false;
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cin >> rows >> columns;
    // row = 1..rows (top to bottom), column = 1..columns (left to right)
    for (int row = 1; row <= rows; row++)
        for (int column = 1; column <= columns; column++) cin >> blocked[row][column];
    visited[1][1] = true;
    walk(1, 1);
    cout << "DONE\n";
}
