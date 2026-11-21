import sys
d = list(map(int, sys.stdin.read().split())); n, m = d[0], d[1]; A = d[2:2+n]
for x in d[2+n:2+n+m]:
    idx = [i for i in range(n) if A[i] <= x]; print(max(idx) if idx else -1)
