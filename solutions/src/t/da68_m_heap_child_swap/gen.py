import random, sys
random.seed(int(sys.argv[1]))
T = random.randint(1, 4); print(T)
for _ in range(T):
    a = random.randint(1, 7); n = 2 ** a - 1
    print(n); print(*[random.randint(-20, 20) for _ in range(n)])
    print(random.randint(0, n - 1))
