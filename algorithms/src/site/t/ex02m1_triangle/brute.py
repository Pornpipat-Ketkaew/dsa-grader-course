# try every route: 2^(N-1) of them
import sys
d = list(map(int, sys.stdin.read().split())); n = d[0]; t = []; p = 1
for i in range(n): t.append(d[p:p+i+1]); p += i+1
best = 0
for mask in range(1 << (n-1)):
    j = 0; s = t[0][0]
    for i in range(1, n):
        if mask >> (i-1) & 1: j += 1
        s += t[i][j]
    best = max(best, s)
print(best)
