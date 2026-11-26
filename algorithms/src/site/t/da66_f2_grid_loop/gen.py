import random, sys
random.seed(int(sys.argv[1])); R = random.randint(1, 5); C = random.randint(1, 5)
print(R, C)
for _ in range(R): print(*[random.randint(1, 6) for _ in range(C)])
