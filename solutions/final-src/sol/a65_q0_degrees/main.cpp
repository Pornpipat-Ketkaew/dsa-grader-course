#include <cstdio>
#include <vector>
#include <algorithm>
using namespace std;

// n can be 5,000, so the matrix has 25,000,000 numbers (about 50 MB of text).
// Even cin with sync_with_stdio(false) needs ~1 s for that, so we read the
// whole input in big chunks with fread and parse the digits ourselves.
static char buf[1 << 16];
int bufLen = 0, bufPos = 0;
int readChar() {
    if (bufPos == bufLen) {
        bufLen = fread(buf, 1, sizeof(buf), stdin);
        bufPos = 0;
        if (bufLen <= 0) return -1;
    }
    return buf[bufPos++];
}
int readInt() {
    int c = readChar();
    while (c != '-' && (c < '0' || c > '9')) c = readChar();   // skip spaces / newlines
    int x = 0;
    while (c >= '0' && c <= '9') { x = x * 10 + (c - '0'); c = readChar(); }
    return x;
}

int main() {
    int n = readInt();
    vector<int> deg(n, 0);
    // row i of the adjacency matrix lists the neighbours of node i:
    // the degree of i is simply the sum of row i
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) deg[i] += readInt();
    }
    int k = *max_element(deg.begin(), deg.end());   // the highest degree
    vector<int> cnt(k + 1, 0);                       // cnt[d] = how many nodes have degree d
    for (int i = 0; i < n; i++) cnt[deg[i]]++;
    // print cnt[0] .. cnt[k]
    for (int d = 0; d <= k; d++) printf(d ? " %d" : "%d", cnt[d]);
    printf("\n");
}
