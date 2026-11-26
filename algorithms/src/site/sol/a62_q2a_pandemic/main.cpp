#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int rows, cols, days;
    cin >> rows >> cols >> days;
    const int MOUNTAIN = 2;
    vector<int> cell(rows * cols);            // cell[row * cols + col]
    vector<int> infectedDay(rows * cols, -1); // -1 = never infected
    vector<int> queue;
    queue.reserve(rows * cols);
    // index = 0..rows*cols-1 in reading order: every 1 is a source on day 0
    for (int index = 0; index < rows * cols; index++) {
        cin >> cell[index];
        if (cell[index] == 1) {
            infectedDay[index] = 0;
            queue.push_back(index);
        }
    }

    const int rowStep[4] = {-1, 1, 0, 0}, colStep[4] = {0, 0, -1, 1};
    // multi-source BFS: read moves forward through the queue, so provinces
    // come out in order of infection day 0, 1, 2, ...
    for (size_t read = 0; read < queue.size(); read++) {
        int index = queue[read];
        if (infectedDay[index] == days) continue;   // its neighbours would fall on day T+1: too late
        int row = index / cols, col = index % cols;
        // direction = up, down, left, right
        for (int direction = 0; direction < 4; direction++) {
            int nextRow = row + rowStep[direction], nextCol = col + colStep[direction];
            if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) continue;
            int next = nextRow * cols + nextCol;
            if (cell[next] == MOUNTAIN || infectedDay[next] != -1) continue;
            infectedDay[next] = infectedDay[index] + 1;
            queue.push_back(next);
        }
    }
    // every province that entered the queue is infected by day T
    cout << queue.size() << '\n';
}
