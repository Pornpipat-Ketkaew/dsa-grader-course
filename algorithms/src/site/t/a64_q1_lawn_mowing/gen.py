import random, sys
random.seed(int(sys.argv[1])); n = random.randint(1, 10); m = random.randint(1, 10); k = random.choice([0, random.randint(0, 5)])
print(n, m, k); print(*[random.choice([0, random.randint(0, 9)]) for _ in range(n)])
for _ in range(m): print(random.randint(0, n - 1), random.randint(0, 80))
