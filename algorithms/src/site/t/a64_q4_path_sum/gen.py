import random, sys
random.seed(int(sys.argv[1])); n = random.randint(1, 7)
pairs = [(a, b) for a in range(n) for b in range(a + 1, n)]
E = random.sample(pairs, random.randint(0, len(pairs)))
if not E: E = [(0, 0)] if n == 1 else [(0, 1)]
print(n, len(E)); print(*[random.randint(1, 40) for _ in range(8)])
for a, b in E: print(a, b, random.randint(1, 15))
