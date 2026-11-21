#include <cstdio>
#include <vector>
#include <queue>
using namespace std;

int main() {
    int R, C, T;
    if (scanf("%d %d %d", &R, &C, &T) != 3) return 0;
    vector<vector<int>> g(R, vector<int>(C));
    vector<vector<int>> day(R, vector<int>(C, -1));   // day[r][c] = first day the virus is there, -1 = never
    queue<pair<int,int>> q;
    // read the map row by row; every 1 is a source on day 0
    for (int r = 0; r < R; r++)
        for (int c = 0; c < C; c++) {
            if (scanf("%d", &g[r][c]) != 1) return 0;
            if (g[r][c] == 1) { day[r][c] = 0; q.push({r, c}); }
        }
    const int dr[4] = {-1, 1, 0, 0}, dc[4] = {0, 0, -1, 1};
    int infected = 0;
    // multi-source BFS: cells come out of the queue in order of their infection day
    while (!q.empty()) {
        auto [r, c] = q.front(); q.pop();
        infected++;                          // every popped cell has day <= T
        if (day[r][c] == T) continue;        // its neighbours would be infected on day T+1: too late
        // the 4 neighbours: up, down, left, right
        for (int k = 0; k < 4; k++) {
            int nr = r + dr[k], nc = c + dc[k];
            if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;   // off the map
            if (g[nr][nc] == 2 || day[nr][nc] != -1) continue;      // mountain, or already infected
            day[nr][nc] = day[r][c] + 1;
            q.push({nr, nc});
        }
    }
    printf("%d\n", infected);
}
