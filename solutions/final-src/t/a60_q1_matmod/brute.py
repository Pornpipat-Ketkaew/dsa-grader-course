# multiply A by itself n times (the O(n) way), exact big integers, mod at the end
import sys
n, k, a, b, c, d = map(int, sys.stdin.read().split())
M = [a, b, c, d]; R = M[:]
for _ in range(n - 1):
    R = [R[0]*M[0]+R[1]*M[2], R[0]*M[1]+R[1]*M[3], R[2]*M[0]+R[3]*M[2], R[2]*M[1]+R[3]*M[3]]
print(*[x % k for x in R])
