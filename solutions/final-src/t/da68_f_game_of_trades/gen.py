import random, sys
random.seed(int(sys.argv[1])); N = random.randint(1, 4); M = random.randint(1, 3); K = random.randint(0, 8)
print(N, M, K)
for i in range(N): print(*[random.randint(1, 9) for _ in range(M)])
for i in range(N): print(*[random.randint(1, 9) for _ in range(M)])
for i in range(N): print(*[random.randint(0, 3) for _ in range(M)])
