import sys
d = list(map(int, sys.stdin.read().split())); n, m, k = d[0], d[1], d[2]; A = d[3:3+n]; p = 3+n
for _ in range(m):
    a, b = d[p], d[p+1]; p += 2; best = 0
    for r in range(a, n):
        if sum(A[a:r+1]) + (r-a+1)*k <= b: best = max(best, sum(A[a:r+1]))
    print(best)
