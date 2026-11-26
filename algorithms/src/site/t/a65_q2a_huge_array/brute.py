d = list(map(int, open(0).read().split())); n, q = d[0], d[1]; A = []
for i in range(n): A += [d[2+2*i]] * d[3+2*i]
A.sort(); [print(A[p - 1]) for p in d[2+2*n:]]
