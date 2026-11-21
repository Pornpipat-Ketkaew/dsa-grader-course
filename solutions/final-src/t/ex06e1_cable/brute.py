import sys; sys.path.insert(0, sys.argv[1]); from graphlib import kruskal
d = list(map(int, sys.stdin.read().split())); n = d[0]; p = 1; E = []
for i in range(n-1):
    for j in range(i+1, n): E.append((d[p], i, j)); p += 1
print(kruskal(n, E))
