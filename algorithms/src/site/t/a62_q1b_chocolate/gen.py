import random, sys
random.seed(int(sys.argv[1]))
n = random.randint(2, 16); k = random.randint(1, min(10, n))
S = [1] + random.sample(range(2, n+1), k-1) if k > 1 else [1]
random.shuffle(S); print(n, k); print(*S)
