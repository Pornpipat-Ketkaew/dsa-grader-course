# an edge is ON the cycle exactly when removing it keeps the graph connected
import sys; sys.path.insert(0, sys.argv[1]); from graphlib import comps
d = list(map(int, sys.stdin.read().split())); n = d[0]; E = [(d[1+2*i], d[2+2*i]) for i in range(n)]
print(sum(1 for i in range(n) if len(comps(n, E[:i] + E[i+1:])) == 1))
