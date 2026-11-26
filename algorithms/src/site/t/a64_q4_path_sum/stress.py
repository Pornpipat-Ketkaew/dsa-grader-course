import random, sys
seed = int(sys.argv[1]); random.seed(seed); n = 20
pairs = [(a, b) for a in range(n) for b in range(a + 1, n)]
m = random.choice([25, 40, 80, 190]); W = random.choice([10, 100, 1000])
E = random.sample(pairs, m)
print(n, m); print(*[random.randint(1, 20000) for _ in range(8)])
for a, b in E: print(a, b, random.randint(1, W))
