import random, sys
random.seed(int(sys.argv[1])); R = random.randint(1, 5); C = random.randint(1, 5); k = random.randint(1, R * C)
F = random.sample([(r, c) for r in range(1, R + 1) for c in range(1, C + 1)], k); print(R, C, k); [print(*f) for f in F]
q = random.randint(1, 6); print(q); [print(random.randint(1, R), random.randint(1, C)) for _ in range(q)]
