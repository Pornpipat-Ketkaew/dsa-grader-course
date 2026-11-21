# enumerate every valid code of size 2^k from the definition (k <= 4), then look up
import sys, itertools
d = list(map(int, sys.stdin.read().split())); n, k = d[0], d[1]
S = set(itertools.product((0, 1), repeat=2))
for _ in range(k - 1):
    S = {a + b for a in S for b in S if abs(sum(a) - sum(b)) <= 1}
L = 1 << k
for t in range(n):
    print("yes" if tuple(d[2+t*L:2+(t+1)*L]) in S else "no")
