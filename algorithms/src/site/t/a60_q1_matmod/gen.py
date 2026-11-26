import random, sys
random.seed(int(sys.argv[1]))
print(random.randint(1, 300), random.randint(1, 10000)); print(*[random.randint(1, 9999) for _ in range(4)])
