import random, sys
random.seed(int(sys.argv[1])); R = random.randint(1, 7); C = random.randint(1, 7); k = random.randint(0, 4); p = random.random() * 0.4
print(R, C, k)
for r in range(R): print(*[1 if random.random() < p else 0 for _ in range(C)])
