# Floyd-Warshall all-pairs distances, then count per student
import sys
d = list(map(int, sys.stdin.read().split())); n, e, K = d[0], d[1], d[2]
INF = 10**9; dist = [[0 if i == j else INF for j in range(n)] for i in range(n)]
for i in range(e): a, b = d[3+2*i], d[4+2*i]; dist[a][b] = dist[b][a] = 1
for k in range(n):
    for i in range(n):
        for j in range(n): dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
print(max(sum(1 for j in range(n) if dist[i][j] <= K) for i in range(n)))
