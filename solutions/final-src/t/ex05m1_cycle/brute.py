# a forest has exactly (nodes - components) edges; any extra edge means a cycle
import sys; sys.path.insert(0, sys.argv[1]); from graphlib import comps
d = list(map(int, sys.stdin.read().split())); T = d[0]; p = 1
for _ in range(T):
    n, e = d[p], d[p+1]; p += 2; E = [(d[p+2*i], d[p+2*i+1]) for i in range(e)]; p += 2*e
    print("YES" if e > n - len(comps(n, E)) else "NO")
