import sys; sys.path.insert(0, sys.argv[1]); from graphlib import comps
d = list(map(int, sys.stdin.read().split())); v, e = d[0], d[1]
print(len(comps(v, [(d[2+2*i], d[3+2*i]) for i in range(e)], base=1)))
