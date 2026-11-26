d = list(map(int, open(0).read().split())); n, m, k = d[:3]; A = d[3:3+n]
print(*[sum(p - k <= a <= p + k for a in A) for p in d[3+n:]])
