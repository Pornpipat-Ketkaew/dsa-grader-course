# try every cycle of distinct currencies (n <= 5) and multiply the rates exactly as given
import sys, itertools
d = sys.stdin.read().split(); K = int(d[0]); p = 1
for _ in range(K):
    n = int(d[p]); p += 1; R = [[float(d[p+i*n+j]) for j in range(n)] for i in range(n)]; p += n*n
    ok = False
    for L in range(2, n+1):
        for cyc in itertools.permutations(range(n), L):
            prod = 1.0
            for i in range(L): prod *= R[cyc[i]][cyc[(i+1) % L]]
            if prod > 1 + 1e-9: ok = True
    print("YES" if ok else "NO")
