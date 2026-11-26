#include <iostream>
#include <vector>
#include <queue>
#include <functional>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int rows, cols;
    cin >> rows >> cols;
    vector<int> fee(rows * cols);                 // fee[row * cols + col]
    // index = 0..rows*cols-1 in reading order
    for (int index = 0; index < rows * cols; index++) cin >> fee[index];

    // Dijkstra on the grid graph. Entering block v costs fee[v], so every edge
    // u -> v weighs fee[v] >= 0. The start block is free.
    const int UNREACHED = -1;
    vector<int> cost(rows * cols, UNREACHED);
    // min-heap of (cost, block)
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> heap;
    cost[0] = 0;
    heap.push({0, 0});
    const int rowStep[4] = {-1, 1, 0, 0}, colStep[4] = {0, 0, -1, 1};
    // pop blocks in increasing cost order
    while (!heap.empty()) {
        auto [costHere, index] = heap.top();
        heap.pop();
        if (costHere > cost[index]) continue;     // outdated entry: a cheaper one was handled
        int row = index / cols, col = index % cols;
        // direction = up, down, left, right
        for (int direction = 0; direction < 4; direction++) {
            int nextRow = row + rowStep[direction], nextCol = col + colStep[direction];
            if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) continue;
            int next = nextRow * cols + nextCol;
            int through = costHere + fee[next];
            if (cost[next] == UNREACHED || through < cost[next]) {
                cost[next] = through;
                heap.push({through, next});
            }
        }
    }

    // row = 0..rows-1, col = 0..cols-1: print the table of minimum costs
    for (int row = 0; row < rows; row++)
        for (int col = 0; col < cols; col++)
            cout << cost[row * cols + col] << (col + 1 < cols ? ' ' : '\n');
}
