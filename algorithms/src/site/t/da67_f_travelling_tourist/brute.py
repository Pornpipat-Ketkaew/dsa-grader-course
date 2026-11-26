# Floyd-Warshall, then try every visiting order of the sites
import itertools
n, m, k = map(int, input().split()); s = list(map(int, input().split()))
INF = float('inf'); d = [[0 if i == j else INF for j in range(n + 1)] for i in range(n + 1)]
for _ in range(m):
    a, b, c = map(int, input().split()); d[a][b] = d[b][a] = min(d[a][b], c)
for x in range(1, n + 1):
    for i in range(1, n + 1):
        for j in range(1, n + 1): d[i][j] = min(d[i][j], d[i][x] + d[x][j])
print(min(sum(d[p[i]][p[i + 1]] for i in range(k - 1)) for p in itertools.permutations(s)))
