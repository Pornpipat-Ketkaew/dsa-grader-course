n, m = map(int, input().split()); K = list(map(int, input().split()))
adj = [[] for _ in range(n)]
for _ in range(m):
    a, b, w = map(int, input().split())
    if a != b: adj[a].append((b, w)); adj[b].append((a, w))
sums = set()
def go(u, seen, s):
    sums.add(s)
    for v, w in adj[u]:
        if v not in seen: go(v, seen | {v}, s + w)
for s in range(n): go(s, {s}, 0)
for k in K: print("YES" if k in sums else "NO")
