# LP by exact fractions: try every subset that is taken fully, plus at most one item taken partly
from fractions import Fraction as Fr
W, n = input().split(); W = Fr(W); n = int(n)
v = [Fr(x) for x in input().split()]; w = [Fr(x) for x in input().split()]
best = Fr(0)
for mask in range(1 << n):
    tw = sum(w[i] for i in range(n) if mask >> i & 1)
    if tw > W: continue
    tv = sum(v[i] for i in range(n) if mask >> i & 1)
    best = max(best, tv)
    for j in range(n):
        if not mask >> j & 1: best = max(best, tv + v[j] * min(1, (W - tw) / w[j]))
print("%.4f" % float(best))
