import random, sys
random.seed(int(sys.argv[1])); n = random.randint(1, 12); m = random.randint(1, 12)
print(n, m); print(*sorted(random.randint(1, 15) for _ in range(n))); print(*[random.randint(0, 17) for _ in range(m)])
