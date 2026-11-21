import sys; sys.path.insert(0, sys.argv[1]); from graphlib import kruskal
d = list(map(int, sys.stdin.read().split())); n = d[0]; x = d[1:1+n]
print(kruskal(n, [(x[i] ^ x[j], i, j) for i in range(n) for j in range(i+1, n)], maximum=True))
