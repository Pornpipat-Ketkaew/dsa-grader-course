import random, sys
random.seed(int(sys.argv[1])); n = random.randint(2, 8); p = random.random()
print(n)
for i in range(n): print(*[0 if i == j else (random.randint(1, 20) if random.random() < p else -1) for j in range(n)])
