#include <cstdio>
#include <vector>
using namespace std;

// R, C <= 5,000 -> up to 25,000,000 cells (about 50 MB of input).
// We read the input in big chunks with fread and keep ONE BYTE per cell.
static char buf[1 << 16];
int bufLen = 0, bufPos = 0;
int readChar() {
    if (bufPos == bufLen) { bufLen = fread(buf, 1, sizeof(buf), stdin); bufPos = 0; if (bufLen <= 0) return -1; }
    return buf[bufPos++];
}
int readInt() {
    int c = readChar();
    while (c < '0' || c > '9') c = readChar();
    int x = 0;
    while (c >= '0' && c <= '9') { x = x * 10 + (c - '0'); c = readChar(); }
    return x;
}

int main() {
    int R = readInt(), C = readInt();
    // cell (r, c) lives at index r*C + c
    vector<char> g((size_t)R * C);
    vector<int> q;                     // BFS queue stored in a plain array
    q.reserve((size_t)R * C);
    // read every cell; every country-1 cell is a starting point (a road of length 1)
    for (int i = 0; i < R * C; i++) {
        g[i] = readInt();
        if (g[i] == 1) { q.push_back(i); g[i] = 3; }   // 3 = "blocked": volcano OR already visited
    }
    // Multi-source BFS, one LAYER at a time. Layer L holds the cells whose shortest
    // road (counted in cells, both ends included) has length L. Layer 1 = all country-1 cells.
    size_t head = 0;
    // layers L = 1, 2, 3, ... until a country-2 cell is reached
    for (int L = 1; head < q.size(); L++) {
        size_t layerEnd = q.size();    // cells q[head .. layerEnd-1] form layer L
        while (head < layerEnd) {
            int u = q[head++];
            int r = u / C, c = u % C;
            // the 4 neighbours: up, down, left, right (only those inside the map)
            int nb[4], cnt = 0;
            if (r > 0)     nb[cnt++] = u - C;
            if (r < R - 1) nb[cnt++] = u + C;
            if (c > 0)     nb[cnt++] = u - 1;
            if (c < C - 1) nb[cnt++] = u + 1;
            for (int k = 0; k < cnt; k++) {
                int v = nb[k];
                if (g[v] == 3) continue;                          // volcano or already visited
                if (g[v] == 2) { printf("%d\n", L + 1); return 0; } // first country-2 cell: done
                g[v] = 3;                                         // mark visited
                q.push_back(v);
            }
        }
    }
    printf("-1\n");                    // cannot happen: the PDF guarantees a road exists
}
