import sys
d = sys.stdin.read().split(); p = 0
n, k = int(d[0]), int(d[1]); p = 2; iv = []
for _ in range(n): iv.append((int(d[p]), int(d[p+1]))); p += 2
q = int(d[p]); p += 1
for _ in range(q):
    x = int(d[p]); p += 1
    print("YES" if sum(1 for l, r in iv if l <= x <= r) >= k else "NO")
