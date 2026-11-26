import random, sys
random.seed(int(sys.argv[1])); n = random.randint(1, 14); f = random.randint(1, n); w = random.randint(0, 3)
print(f, w, n); print(*random.sample(range(1, n + 1), f))
