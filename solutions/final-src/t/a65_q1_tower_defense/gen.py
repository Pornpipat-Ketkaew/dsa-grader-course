import random, sys
random.seed(int(sys.argv[1])); n = random.randint(1, 15); m = random.randint(1, 5); k = random.randint(1, 5); w = random.randint(0, 4)
print(n, m, k, w); print(*[random.randint(1, n) for _ in range(m)]); print(*[random.randint(0, 3) for _ in range(m)])
print(*random.sample(range(1, n + 1), min(k, n)) if k <= n else [random.randint(1, n) for _ in range(k)])
