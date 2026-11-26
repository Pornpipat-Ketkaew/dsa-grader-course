# Floyd-Warshall on the open cities only
import sys
d = sys.stdin.read().split(); n, m, k = int(d[0]), int(d[1]), int(d[2]); C = set(int(x) for x in d[3:3 + k]); p = 3 + k
INF = float('inf'); D = [[0 if i == j else INF for j in range(n + 1)] for i in range(n + 1)]
for i in range(m):
    a, b, c = int(d[p]), int(d[p + 1]), int(d[p + 2]); p += 3
    if a in C or b in C: continue
    D[a][b] = D[b][a] = min(D[a][b], c)
for x in range(1, n + 1):
    if x in C: continue
    for i in range(1, n + 1):
        for j in range(1, n + 1): D[i][j] = min(D[i][j], D[i][x] + D[x][j])
print(D[1][n])
