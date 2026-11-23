import random, sys
random.seed(int(sys.argv[1])); n = random.randint(1, 4); A = random.randint(1, 6)
print(n, A); print(*[random.randint(1, 6) for _ in range(n)]); print(*[random.randint(1, 40) for _ in range(A)])
