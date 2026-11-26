import random, sys
random.seed(int(sys.argv[1]))
n = random.randint(1, 12); print(n)
for i in range(1, n+1): print(*[random.choice([0, random.randint(0, 1000)]) for _ in range(i)])
