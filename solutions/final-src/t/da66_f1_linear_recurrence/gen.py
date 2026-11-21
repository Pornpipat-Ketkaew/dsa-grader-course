import random, sys
random.seed(int(sys.argv[1])); k = random.randint(1, 8); n = random.randint(0, 40)
print(k, n); print(*[random.randint(0, 1000) for _ in range(k)]); print(*[random.randint(0, 1000) for _ in range(k)])
