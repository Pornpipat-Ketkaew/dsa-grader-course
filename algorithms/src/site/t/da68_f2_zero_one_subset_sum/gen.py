import random, sys
random.seed(int(sys.argv[1])); N = random.randint(1, 6); K = random.randint(2, 5); S = random.randint(1, 20)
print(N, K, S); print(*[random.randint(0, 1) for _ in range(N)])
