import itertools
n = int(input())
print(sum(1 for p in itertools.permutations(range(n)) if len({r + p[r] for r in range(n)}) == n and len({r - p[r] for r in range(n)}) == n))
