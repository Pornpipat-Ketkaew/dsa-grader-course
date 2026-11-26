import random, sys
random.seed(int(sys.argv[1]))
n = random.randint(1, 7); print(n)
mode = random.random()
for _ in range(n): print(*[random.randint(-999, -1) if mode < 0.15 else random.randint(-20, 20) for _ in range(n)])
