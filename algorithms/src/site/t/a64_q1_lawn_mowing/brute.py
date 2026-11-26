d = list(map(int, open(0).read().split())); n, m, k = d[:3]; A = d[3:3+n]; q = d[3+n:]
for i in range(m):
    a, b = q[2*i], q[2*i+1]; best = 0
    for r in range(a, n):
        if sum(A[a:r+1]) + (r - a + 1) * k <= b: best = sum(A[a:r+1])
    print(best)
