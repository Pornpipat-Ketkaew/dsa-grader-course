import random, sys
random.seed(int(sys.argv[1])); R = random.randint(2, 4); C = random.randint(2, 6); p = random.choice([0, .15, .3])
print(R, C)
for _ in range(R): print(*[1 if random.random() < p else 0 for _ in range(C)])
