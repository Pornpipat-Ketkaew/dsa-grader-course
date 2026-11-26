# union-find over cells: join two neighbours whenever no wall separates them
d = list(map(int, open(0).read().split())); R, C = d[0], d[1]; g = d[2:]
p = list(range(R * C))
def f(x):
    while p[x] != x: x = p[x]
    return x
for r in range(R):
    for c in range(C):
        if r > 0 and not g[r*C+c] & 1: p[f(r*C+c)] = f((r-1)*C+c)
        if c + 1 < C and not g[r*C+c] & 2: p[f(r*C+c)] = f(r*C+c+1)
print(len({f(i) for i in range(R * C)}))
