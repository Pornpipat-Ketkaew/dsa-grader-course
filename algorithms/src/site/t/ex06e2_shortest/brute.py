# Floyd-Warshall: a negative cycle anywhere shows up as d[i][i] < 0
import sys; sys.path.insert(0, sys.argv[1]); from graphlib import floyd
d = list(map(int, sys.stdin.read().split())); n, e, s = d[0], d[1], d[2]
W = {}
for i in range(e):
    a, b, c = d[3+3*i:6+3*i]; W[(a, b)] = min(W.get((a, b), 10**9), c)
D = floyd(n, W)
if any(D[i][i] < 0 for i in range(n)): print(-1)
else: print(*D[s])
