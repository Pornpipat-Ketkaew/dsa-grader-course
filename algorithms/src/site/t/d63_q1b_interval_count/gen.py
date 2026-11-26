import random, sys
random.seed(int(sys.argv[1])); n = random.randint(1, 10); m = random.randint(1, 10); k = random.randint(0, 6)
print(n, m, k); print(*random.sample(range(0, 30), n)); print(*[random.randint(0, 30) for _ in range(m)])
