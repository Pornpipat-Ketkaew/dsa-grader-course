import sys; sys.path.insert(0, sys.argv[1]); from graphlib import floyd
d = list(map(int, sys.stdin.read().split())); n, m = d[0], d[1]; ci = d[2:2+n]; co = d[2+n:2+2*n]; p = 2+2*n
W = {(d[p+2*i], d[p+2*i+1]): co[d[p+2*i]] + ci[d[p+2*i+1]] for i in range(m)}
D = floyd(n, W)[0]; print(*[-1 if x == float('inf') else x for x in D])
