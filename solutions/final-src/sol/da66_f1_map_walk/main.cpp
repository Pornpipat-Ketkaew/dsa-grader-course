#include <cstdio>
#include <cstring>

int R, C;
int blocked[12][12];     // 1 = "no entry" cell (1-based rows/columns)
bool visited[12][12];    // cells already on the current path
char path[128];          // the commands of the current path (at most R*C - 1 moves)

// Memory limit is only 32 MB and the number of answers can be large,
// so answers are written through a small fixed buffer instead of being stored.
char buf[1 << 16];
int blen = 0;
void flush_buf() { fwrite(buf, 1, blen, stdout); blen = 0; }
void emit(const char *s, int len) {
    if (blen + len + 1 > (int)sizeof(buf)) flush_buf();
    memcpy(buf + blen, s, len);
    blen += len;
    buf[blen++] = '\n';
}

// The three moves, in ALPHABETICAL order of their letter:
// A = right (c+1), B = down (r+1), C = up (r-1).
const char LETTER[3] = {'A', 'B', 'C'};
const int  DR[3]     = { 0,  +1, -1 };
const int  DC[3]     = {+1,   0,  0 };

// We stand on (r, c); path[0 .. len-1] are the commands used to get here.
void walk(int r, int c, int len) {
    if (r == R && c == C) {               // reached the goal: the game ends immediately
        emit(path, len);
        return;
    }
    for (int k = 0; k < 3; k++) {         // k = 0, 1, 2 -> try A, then B, then C
        int nr = r + DR[k], nc = c + DC[k];
        if (nr < 1 || nr > R || nc < 1 || nc > C) continue;   // rule 1: stay inside the map
        if (visited[nr][nc]) continue;                         // rule 2: never revisit a cell
        if (blocked[nr][nc]) continue;                         // rule 4: no-entry cell
        visited[nr][nc] = true;
        path[len] = LETTER[k];
        walk(nr, nc, len + 1);
        visited[nr][nc] = false;                               // undo: free the cell for other paths
    }
}

int main() {
    if (scanf("%d %d", &R, &C) != 2) return 0;
    for (int r = 1; r <= R; r++)
        for (int c = 1; c <= C; c++)
            if (scanf("%d", &blocked[r][c]) != 1) return 0;
    visited[1][1] = true;
    walk(1, 1, 0);
    flush_buf();
    printf("DONE\n");
}
