#include <cstdio>
#include <vector>
using namespace std;

// Directions: 0 = up, 1 = right, 2 = down, 3 = left.
const int DR[4] = {-1, 0, 1, 0}, DC[4] = {0, 1, 0, -1};
// OPEN[t] = the two sides that road type t (1..6) connects
const int OPEN[7][2] = {
    {0, 0},      // (unused)
    {3, 1},      // 1: left  - right
    {0, 2},      // 2: up    - down
    {0, 1},      // 3: up    - right
    {1, 2},      // 4: right - down
    {2, 3},      // 5: down  - left
    {3, 0},      // 6: left  - up
};

int R, C;
vector<vector<int>> g;

bool opens(int r, int c, int dir) {          // does cell (r, c) have an exit towards dir?
    return OPEN[g[r][c]][0] == dir || OPEN[g[r][c]][1] == dir;
}

int main() {
    if (scanf("%d %d", &R, &C) != 2) return 0;
    g.assign(R, vector<int>(C));
    for (int r = 0; r < R; r++)
        for (int c = 0; c < C; c++)
            if (scanf("%d", &g[r][c]) != 1) return 0;

    // Every cell has exactly 2 exits, so every cell has at most 2 real connections.
    // A graph where every node has degree <= 2 splits into simple PATHS and simple CYCLES.
    // We walk each piece once: it is a loop exactly when the walk comes back to its start.
    vector<vector<bool>> seen(R, vector<bool>(C, false));
    int loops = 0, longest = 0;
    // try every cell as a starting point, row by row
    for (int sr = 0; sr < R; sr++) {
        for (int sc = 0; sc < C; sc++) {
            if (seen[sr][sc]) continue;
            // walk forward starting through the cell's first exit
            int r = sr, c = sc, dir = OPEN[g[sr][sc]][0], len = 0;
            bool closed = false;
            seen[sr][sc] = true;
            // each step: leave (r, c) through dir, enter the neighbour, then leave by its other exit
            while (true) {
                len++;
                int nr = r + DR[dir], nc = c + DC[dir];
                int back = (dir + 2) % 4;                            // the side we enter the neighbour from
                if (nr < 0 || nr >= R || nc < 0 || nc >= C) break;   // road runs off the map
                if (!opens(nr, nc, back)) break;                     // neighbour does not connect back
                if (nr == sr && nc == sc) { closed = true; break; }  // back at the start: a loop
                if (seen[nr][nc]) break;                             // cannot happen; safety only
                seen[nr][nc] = true;
                dir = (OPEN[g[nr][nc]][0] == back) ? OPEN[g[nr][nc]][1] : OPEN[g[nr][nc]][0];
                r = nr; c = nc;
            }
            if (closed) {
                loops++;
                if (len > longest) longest = len;
            } else {
                // not a loop: also walk the other way from the start, just to mark that
                // half of the path as seen (so we never start inside it again)
                r = sr; c = sc; dir = OPEN[g[sr][sc]][1];
                while (true) {
                    int nr = r + DR[dir], nc = c + DC[dir];
                    int back = (dir + 2) % 4;
                    if (nr < 0 || nr >= R || nc < 0 || nc >= C) break;
                    if (!opens(nr, nc, back) || seen[nr][nc]) break;
                    seen[nr][nc] = true;
                    dir = (OPEN[g[nr][nc]][0] == back) ? OPEN[g[nr][nc]][1] : OPEN[g[nr][nc]][0];
                    r = nr; c = nc;
                }
            }
        }
    }
    if (loops == 0) printf("0\n");
    else printf("%d %d\n", loops, longest);
}
