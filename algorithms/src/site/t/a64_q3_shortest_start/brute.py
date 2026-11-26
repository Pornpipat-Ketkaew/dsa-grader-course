# Floyd-Warshall, then the best start
n, m, k = map(int, input().split()); v = int(input()); S = list(map(int, input().split()))
INF = float('inf'); d = [[0 if i == j else INF for j in range(n)] for i in range(n)]
for _ in range(m):
    a, b, w = map(int, input().split()); d[a][b] = min(d[a][b], w)
for c in range(n):
    for i in range(n):
        for j in range(n):
            if d[i][c] + d[c][j] < d[i][j]: d[i][j] = d[i][c] + d[c][j]
print(min(d[s][v] for s in S))
