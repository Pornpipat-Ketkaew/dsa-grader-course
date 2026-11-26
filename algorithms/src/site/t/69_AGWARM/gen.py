import random, sys
random.seed(int(sys.argv[1])); R = random.randint(1, 7); C = random.randint(1, 7)
w = random.choice([0.2, 0.5, 0.8])
print(R, C)
for r in range(R): print(*[(random.random() < w) * 1 + (random.random() < w) * 2 for _ in range(C)])
