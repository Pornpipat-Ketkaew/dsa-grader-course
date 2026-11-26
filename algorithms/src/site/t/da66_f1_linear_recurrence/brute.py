# exact big integers, mod only at the very end
import sys
d = list(map(int, sys.stdin.read().split())); k, n = d[0], d[1]; c = d[2:2+k]; a = d[2+k:2+2*k]
R = a[:]
while len(R) <= n: R.append(sum(c[j] * R[-1-j] for j in range(k)))
print(R[n] % 32717)
