d = list(map(int, open(0).read().split())); n, m = d[0], d[1]; A = d[2:2+n]
for x in d[2+n:]: print(max([i for i in range(n) if A[i] <= x], default=-1))
