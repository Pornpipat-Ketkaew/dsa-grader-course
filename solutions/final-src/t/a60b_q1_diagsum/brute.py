# the O(n^4) way straight from the definition: every start (i, j), every length k
import sys
d = list(map(int, sys.stdin.read().split())); n = d[0]; A = [d[1+r*n:1+(r+1)*n] for r in range(n)]
best = None
for i in range(n):
    for j in range(n):
        for k in range(1, n+1):
            s = sum(A[i+p][j+p] for p in range(k) if i+p < n and j+p < n)
            best = s if best is None else max(best, s)
print(best)
