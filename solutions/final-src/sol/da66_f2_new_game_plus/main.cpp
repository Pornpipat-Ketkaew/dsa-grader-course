#include <cstdio>
#include <vector>
using namespace std;

const int MOD = 100000007;

int main() {
    int R, C;
    if (scanf("%d %d", &R, &C) != 2) return 0;
    vector<vector<int>> blocked(R, vector<int>(C));
    for (int r = 0; r < R; r++)
        for (int c = 0; c < C; c++)
            if (scanf("%d", &blocked[r][c]) != 1) return 0;

    // State = (row, the door we used to ENTER this room). Doors: 0 = X (up-right),
    // 1 = Y (right), 2 = Z (down-right). The next door must differ from it.
    // cur[r][d] = number of different room lists that end in room (r, c) and entered it by door d.
    // For column 0 nobody entered by a door yet: we use d = 3 for "start" (no restriction).
    const int DROW[3] = {-1, 0, +1};
    vector<vector<long long>> cur(R, vector<long long>(4, 0)), nxt;
    // column 0: start in any open room
    for (int r = 0; r < R; r++)
        if (!blocked[r][0]) cur[r][3] = 1;
    // move column by column: c -> c+1, for c = 0 .. C-2
    for (int c = 0; c + 1 < C; c++) {
        nxt.assign(R, vector<long long>(4, 0));
        // every room (r, c) and every way d we entered it
        for (int r = 0; r < R; r++)
            for (int d = 0; d < 4; d++) {
                if (cur[r][d] == 0) continue;
                // try the three doors e; door e may not repeat door d
                for (int e = 0; e < 3; e++) {
                    if (e == d) continue;
                    int nr = r + DROW[e];
                    if (nr < 0 || nr >= R || blocked[nr][c + 1]) continue;
                    nxt[nr][e] = (nxt[nr][e] + cur[r][d]) % MOD;
                }
            }
        cur.swap(nxt);
    }
    long long total = 0;
    // every room in the last column, entered by any door
    for (int r = 0; r < R; r++)
        for (int d = 0; d < 4; d++) total = (total + cur[r][d]) % MOD;
    printf("%lld\n", total);
}
