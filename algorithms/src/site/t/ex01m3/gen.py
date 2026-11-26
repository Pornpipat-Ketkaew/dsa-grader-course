import random, sys
random.seed(int(sys.argv[1])); n = random.randint(1, 5); a = random.randint(1, 6)
print(n, a); print(*[random.randint(1, 7) for _ in range(n)]); print(*[random.randint(1, 60) for _ in range(a)])
