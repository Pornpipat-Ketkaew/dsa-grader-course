import random, sys
random.seed(int(sys.argv[1])); n = random.randint(1, 7)
pairs = [(a, b) for a in range(n) for b in range(n) if a != b]
E = random.sample(pairs, random.randint(min(1, len(pairs)), len(pairs))) if pairs else []
if not E: n = 2; E = [(0, 1)]
print(n, len(E)); print(*[random.randint(1, 1000) for _ in range(n)]); print(*[random.randint(1, 1000) for _ in range(n)])
for a, b in E: print(a, b)
