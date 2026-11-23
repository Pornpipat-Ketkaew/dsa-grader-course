n, V = map(int, input().split()); it = [tuple(map(int, input().split())) for _ in range(n)]; best = -1
for mask in range(1 << n):
    w = sum(it[i][0] for i in range(n) if mask >> i & 1)
    if w == V:
        p = sum(it[i][1] for i in range(n) if mask >> i & 1)
        if best == -1 or p < best: best = p
print(best)
