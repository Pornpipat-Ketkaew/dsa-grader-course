import itertools
n, e = map(int, input().split()); E = [tuple(map(int, input().split())) for _ in range(e)]
for k in range(1, n + 1):
    if any(all(c[a] != c[b] for a, b in E) for c in itertools.product(range(k), repeat=n)): print(k); break
