#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int rows, cols, k;
    cin >> rows >> cols >> k;
    vector<int> cell(rows * cols);             // cell[row * cols + col]: 0 water, 1 land, 2 filled
    vector<int> distance(rows * cols, -1);     // steps to the nearest ORIGINAL land, -1 = farther than k
    vector<int> queue;
    queue.reserve(rows * cols);
    // index = 0..rows*cols-1 in reading order: every land cell is a BFS source at distance 0
    for (int index = 0; index < rows * cols; index++) {
        cin >> cell[index];
        if (cell[index] == 1) {
            distance[index] = 0;
            queue.push_back(index);
        }
    }

    const int rowStep[4] = {-1, 1, 0, 0}, colStep[4] = {0, 0, -1, 1};
    // multi-source BFS: cells leave the queue in order of distance 0, 1, 2, ...
    for (size_t read = 0; read < queue.size(); read++) {
        int index = queue[read];
        if (distance[index] == k) continue;     // a neighbour would be k + 1 away: not allowed
        int row = index / cols, col = index % cols;
        // direction = up, down, left, right
        for (int direction = 0; direction < 4; direction++) {
            int nextRow = row + rowStep[direction], nextCol = col + colStep[direction];
            if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) continue;
            int next = nextRow * cols + nextCol;
            if (distance[next] != -1) continue;     // land, or water already reached
            distance[next] = distance[index] + 1;
            cell[next] = 2;                         // water within k steps of land is filled
            queue.push_back(next);
        }
    }

    // build the whole map in one string: up to 10^6 numbers
    string output;
    output.reserve(2 * rows * cols);
    // row = 0..rows-1, col = 0..cols-1: print in the input layout
    for (int row = 0; row < rows; row++)
        for (int col = 0; col < cols; col++) {
            output += char('0' + cell[row * cols + col]);
            output += (col + 1 < cols ? ' ' : '\n');
        }
    cout << output;
}
