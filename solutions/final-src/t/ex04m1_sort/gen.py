import random, sys
random.seed(int(sys.argv[1])); n = random.randint(1, 8)
print(n); print(*[random.randint(1, 3) for _ in range(n)])
