# try every set of n - 1 lines, keep the spanning trees, take the longest total
import itertools, math, sys
d = list(map(int, sys.stdin.read().split())); n, m = d[0], d[1]; H = d[2:2+n]; E = []
for i in range(m):
    a, b, g = d[2+n+3*i: 5+n+3*i]; E.append((a, b, math.hypot(g, H[a] - H[b])))
best = 0
for S in itertools.combinations(E, n - 1):
    p = list(range(n))
    def f(x):
        while p[x] != x: x = p[x]
        return x
    ok = True
    for a, b, w in S:
        ra, rb = f(a), f(b)
        if ra == rb: ok = False; break
        p[ra] = rb
    if ok: best = max(best, sum(w for _, _, w in S))
print(f"{best:.2f}")
