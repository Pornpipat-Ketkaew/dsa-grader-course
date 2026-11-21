# simulate second by second: a server falls c[v] seconds after its first infected neighbour
import sys
d = list(map(int, sys.stdin.read().split())); n, m, k = d[0], d[1], d[2]; S = d[3:3+k]; c = d[3+k:3+k+n]; p = 3+k+n
adj = [[] for _ in range(n)]
for i in range(m): a, b = d[p+2*i], d[p+2*i+1]; adj[a].append(b); adj[b].append(a)
INF = 10**9; t = [INF]*n
for s in S: t[s] = c[s]
ch = True
while ch:
    ch = False
    for u in range(n):
        for v in adj[u]:
            if t[u] + c[v] < t[v]: t[v] = t[u] + c[v]; ch = True
print(max(t))
