import random, sys
random.seed(int(sys.argv[1])); n = random.randint(1, 12); print(n); print(''.join(random.choice('abc'[:random.randint(1, 3)]) for _ in range(n)))
