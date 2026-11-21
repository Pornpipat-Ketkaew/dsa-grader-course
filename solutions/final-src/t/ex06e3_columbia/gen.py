import random, sys
random.seed(int(sys.argv[1])); R = random.randint(1, 5); C = random.randint(1, 5); print(R, C)
for _ in range(R): print(*[random.choice([0, random.randint(0, 9), 1000]) for _ in range(C)])
