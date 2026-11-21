# rebuild the network every year and run Dijkstra (heapq) from province 1
import sys, heapq
d = list(map(int, sys.stdin.read().split())); n = d[0]; adj = {i: [] for i in range(1, n+1)}
adj[1].append((2, d[1])); adj[2].append((1, d[1])); p = 2; out = []
for i in range(3, n+1):
    k = d[p]; p += 1
    for _ in range(k): t, w = d[p], d[p+1]; p += 2; adj[i].append((t, w)); adj[t].append((i, w))
    dist = {1: 0}; pq = [(0, 1)]
    while pq:
        x, u = heapq.heappop(pq)
        if x > dist[u]: continue
        for v, w in adj[u]:
            if x + w < dist.get(v, 1 << 60): dist[v] = x + w; heapq.heappush(pq, (x + w, v))
    out.append(dist[2])
print(*out)
