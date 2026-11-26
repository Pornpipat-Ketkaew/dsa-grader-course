import itertools
n = int(input()); S = list(map(int, input().split())); F = list(map(int, input().split()))
best = 0
for mask in range(1 << n):
    c = [i for i in range(n) if mask >> i & 1]
    if all(S[a] >= F[b] or S[b] >= F[a] for a, b in itertools.combinations(c, 2)): best = max(best, len(c))
print(best)
