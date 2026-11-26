d = list(map(int, open(0).read().split())); n, m = d[0], d[1]; M = {}
for i in range(n): M[d[2+2*i]] = d[3+2*i]
print(*[sum(d[2+2*n+2*j] <= v <= d[3+2*n+2*j] for v in M.values()) for j in range(m)])
