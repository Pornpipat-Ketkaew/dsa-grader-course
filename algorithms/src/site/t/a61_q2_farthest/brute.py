import sys; sys.path.insert(0, sys.argv[1]); from graphlib import floyd
d = list(map(int, sys.stdin.read().split())); n = d[0]
W = {(i, j): d[1+i*n+j] for i in range(n) for j in range(n) if i != j and d[1+i*n+j] != -1}
D = floyd(n, W)[0]; print(-1 if max(D) == float('inf') else max(D))
