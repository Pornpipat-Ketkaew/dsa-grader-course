# every simple path from 1 to N; on each, the K slowest tunnels are free
import sys
d = list(map(int, sys.stdin.read().split())); n, m, k = d[0], d[1], d[2]
adj = {v: [] for v in range(1, n + 1)}
for i in range(m):
    u, v, t = d[3+3*i: 6+3*i]; adj[u].append((v, t)); adj[v].append((u, t))
best = None
def go(v, seen, times):
    global best
    if v == n:
        c = sum(sorted(times)[:max(0, len(times) - k)])
        best = c if best is None else min(best, c); return
    for u, t in adj[v]:
        if u not in seen: seen.add(u); times.append(t); go(u, seen, times); times.pop(); seen.discard(u)
go(1, {1}, [])
print(best)
