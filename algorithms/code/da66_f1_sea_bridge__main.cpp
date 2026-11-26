#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int rows, cols;
    cin >> rows >> cols;
    string line;
    getline(cin, line);                        // finish the line that held R and C

    const char COUNTRY_1 = 1, COUNTRY_2 = 2, BLOCKED = 3;   // BLOCKED = volcano or already visited
    // up to 5 000 x 5 000 = 25 000 000 cells: one byte each, at index row * cols + col
    vector<char> cell((size_t)rows * cols);
    vector<int> queue;
    queue.reserve((size_t)rows * cols);
    // row = 0..rows-1: every cell is one digit 0..3, so a whole line is read at once
    // and its digits are taken in order (much faster than 25 000 000 int reads)
    for (int row = 0; row < rows; row++) {
        do getline(cin, line); while (line.find_first_of("0123") == string::npos);
        int index = row * cols;
        for (char ch : line)
            if (ch >= '0' && ch <= '3') {
                cell[index] = ch - '0';
                // every country-1 cell starts the BFS: a road of 1 cell
                if (cell[index] == COUNTRY_1) {
                    queue.push_back(index);
                    cell[index] = BLOCKED;
                }
                index++;
            }
    }

    // Multi-source BFS, one layer at a time. Layer "length" holds the cells that
    // a road of exactly "length" cells (starting on country 1) can reach first.
    size_t read = 0;
    // length = 1, 2, 3, ...: stop at the first country-2 cell
    for (int length = 1; read < queue.size(); length++) {
        size_t layerEnd = queue.size();
        // read = this layer's cells; new cells are appended behind layerEnd
        for (; read < layerEnd; read++) {
            int index = queue[read];
            int row = index / cols, col = index % cols;
            int neighbor[4], count = 0;
            if (row > 0) neighbor[count++] = index - cols;
            if (row + 1 < rows) neighbor[count++] = index + cols;
            if (col > 0) neighbor[count++] = index - 1;
            if (col + 1 < cols) neighbor[count++] = index + 1;
            // the (up to) 4 neighbours inside the map
            for (int which = 0; which < count; which++) {
                int next = neighbor[which];
                if (cell[next] == BLOCKED) continue;
                if (cell[next] == COUNTRY_2) {           // the road reaches country 2: one more cell
                    cout << length + 1 << '\n';
                    return 0;
                }
                cell[next] = BLOCKED;                    // water: becomes part of layer length + 1
                queue.push_back(next);
            }
        }
    }
    cout << -1 << '\n';                                  // impossible by the statement
}
