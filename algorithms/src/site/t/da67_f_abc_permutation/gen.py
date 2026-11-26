import random, sys
random.seed(int(sys.argv[1])); N = random.randint(1, 6); print(N, *[random.randint(0, N) for _ in range(3)])
