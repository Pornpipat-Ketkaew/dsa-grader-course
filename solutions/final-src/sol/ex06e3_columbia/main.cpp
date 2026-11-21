#include <cstdio>
#include <vector>
#include <queue>
using namespace std;

int main() {
    int R, C;
    if (scanf("%d %d", &R, &C) != 2) return 0;
    vector<vector<int>> fee(R, vector<int>(C));
    // read the entrance fee of every block, row by row
    for (int r = 0; r < R; r++)
        for (int c = 0; c < C; c++)
            if (scanf("%d", &fee[r][c]) != 1) return 0;

    // Dijkstra on the grid: entering block (r, c) costs fee[r][c].
    // So the "edge" into a block weighs that block's fee.
    const int INF = 2e9;
    vector<vector<int>> dist(R, vector<int>(C, INF));
    // min-heap of (distance, r, c)
    priority_queue<tuple<int,int,int>, vector<tuple<int,int,int>>, greater<tuple<int,int,int>>> pq;
    dist[0][0] = 0;                          // our own block is free
    pq.push({0, 0, 0});
    const int dr[4] = {-1, 1, 0, 0}, dc[4] = {0, 0, -1, 1};
    // pop blocks in increasing order of cost
    while (!pq.empty()) {
        auto [d, r, c] = pq.top(); pq.pop();
        if (d > dist[r][c]) continue;        // an old, outdated entry: skip it
        // the 4 neighbouring blocks: up, down, left, right
        for (int k = 0; k < 4; k++) {
            int nr = r + dr[k], nc = c + dc[k];
            if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
            int nd = d + fee[nr][nc];
            if (nd < dist[nr][nc]) {
                dist[nr][nc] = nd;
                pq.push({nd, nr, nc});
            }
        }
    }
    // print the R x C table of minimum costs
    for (int r = 0; r < R; r++) {
        for (int c = 0; c < C; c++) printf(c ? " %d" : "%d", dist[r][c]);
        printf("\n");
    }
}
