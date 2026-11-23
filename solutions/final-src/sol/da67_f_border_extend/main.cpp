#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int R, C, k;
    cin >> R >> C >> k;
    vector<vector<int>> g(R, vector<int>(C));
    vector<vector<int>> dist(R, vector<int>(C, -1));   // steps from the nearest land, -1 = not reached
    queue<pair<int, int>> q;
    // read the map; every land cell (1) is a BFS source at distance 0
    for (int r = 0; r < R; r++) {
        for (int c = 0; c < C; c++) {
            cin >> g[r][c];
            if (g[r][c] == 1) { dist[r][c] = 0; q.push({r, c}); }
        }
    }
    int dr[4] = {-1, 1, 0, 0}, dc[4] = {0, 0, -1, 1};
    // multi-source BFS, but never further than k steps
    while (!q.empty()) {
        auto [r, c] = q.front(); q.pop();
        if (dist[r][c] == k) continue;        // the border may not grow past k
        // the four neighbours up, down, left, right
        for (int d = 0; d < 4; d++) {
            int nr = r + dr[d], nc = c + dc[d];
            if (nr < 0 || nr >= R || nc < 0 || nc >= C || dist[nr][nc] != -1) continue;
            dist[nr][nc] = dist[r][c] + 1;
            g[nr][nc] = 2;                    // water within k steps becomes border
            q.push({nr, nc});
        }
    }
    // print the new map in the input format
    for (int r = 0; r < R; r++) {
        for (int c = 0; c < C; c++) cout << g[r][c] << (c + 1 < C ? ' ' : '\n');
    }
}
