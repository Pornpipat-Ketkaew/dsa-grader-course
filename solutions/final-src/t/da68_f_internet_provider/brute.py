# try every set of cables and every set of modem cities
import itertools
n, m, U, K = map(int, input().split()); E = [tuple(map(int, input().split())) for _ in range(m)]
best = None
for mask in range(1 << m):
    par = list(range(n + 1))
    def f(x):
        while par[x] != x: x = par[x]
        return x
    cost = 0
    for i in range(m):
        if mask >> i & 1:
            a, b, d = E[i]; par[f(a)] = f(b); cost += d * U
    comps = len({f(v) for v in range(1, n + 1)})
    # modems in K cities merge up to K components into one (needs at least 2 modems to do anything)
    ok = comps == 1 or (K >= 2 and comps <= K)
    if ok and (best is None or cost < best): best = cost
print(best)
