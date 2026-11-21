def comps(n, edges, base=0):
    """connected components by repeated label propagation (deliberately different from DFS/DSU)"""
    lab = list(range(n + base))
    changed = True
    while changed:
        changed = False
        for a, b in edges:
            m = min(lab[a], lab[b])
            if lab[a] != m or lab[b] != m: lab[a] = lab[b] = m; changed = True
    groups = {}
    for v in range(base, n + base): groups.setdefault(lab[v], []).append(v)
    return list(groups.values())

def kruskal(n, edges, maximum=False):
    """total weight of a minimum (or maximum) spanning tree; edges = (w, a, b)"""
    p = list(range(n))
    def f(x):
        while p[x] != x: p[x] = p[p[x]]; x = p[x]
        return x
    tot = 0
    for w, a, b in sorted(edges, reverse=maximum):
        ra, rb = f(a), f(b)
        if ra != rb: p[ra] = rb; tot += w
    return tot

def floyd(n, w):
    """w: dict (a,b)->weight (directed). returns all-pairs matrix, INF = None"""
    INF = float('inf'); d = [[0 if i == j else INF for j in range(n)] for i in range(n)]
    for (a, b), c in w.items(): d[a][b] = min(d[a][b], c)
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if d[i][k] + d[k][j] < d[i][j]: d[i][j] = d[i][k] + d[k][j]
    return d
