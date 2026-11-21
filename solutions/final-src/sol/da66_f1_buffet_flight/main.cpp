#include <cstdio>
#include <vector>
using namespace std;

// Up to n*n - n ~ 4,000,000 flights = 8,000,000 numbers: read them fast.
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
    int n = readInt(), m = readInt();
    vector<int> ci(n), co(n);
    for (int i = 0; i < n; i++) ci[i] = readInt();    // landing fees
    for (int i = 0; i < n; i++) co[i] = readInt();    // take-off fees
    // flight[a][b] = true if there is a flight a -> b (matrix: the graph can be dense)
    vector<vector<char>> flight(n, vector<char>(n, 0));
    for (int i = 0; i < m; i++) {
        int a = readInt(), b = readInt();
        flight[a][b] = 1;
    }
    // A flight a -> b costs co[a] + ci[b]. All costs are positive -> Dijkstra.
    // The graph may have ~n^2 edges, so use the O(n^2) array version (no heap).
    const long long INF = 1e18;
    vector<long long> dist(n, INF);
    vector<bool> done(n, false);
    dist[0] = 0;
    // n rounds: finalise the cheapest airport not finalised yet
    for (int round = 0; round < n; round++) {
        int u = -1;
        for (int v = 0; v < n; v++)
            if (!done[v] && dist[v] < INF && (u == -1 || dist[v] < dist[u])) u = v;
        if (u == -1) break;                               // the rest is unreachable
        done[u] = true;
        // relax every flight u -> v
        for (int v = 0; v < n; v++)
            if (flight[u][v] && dist[u] + co[u] + ci[v] < dist[v]) dist[v] = dist[u] + co[u] + ci[v];
    }
    // airports 0 .. n-1, -1 for unreachable
    for (int v = 0; v < n; v++) printf(v ? " %lld" : "%lld", dist[v] == INF ? -1LL : dist[v]);
    printf("\n");
}
