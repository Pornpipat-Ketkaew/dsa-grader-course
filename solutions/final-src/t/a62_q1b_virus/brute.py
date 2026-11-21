# enumerate EVERY virus of size 2^k straight from the definition, then look the codes up
import sys
d = list(map(int, sys.stdin.read().split())); n, k = d[0], d[1]
S = {(0, 1)}
for _ in range(k - 1):
    S = {a2 + b for a in S for b in S for a2 in (a, a[::-1])}
L = 1 << k
for t in range(n):
    print("yes" if tuple(d[2+t*L:2+(t+1)*L]) in S else "no")
