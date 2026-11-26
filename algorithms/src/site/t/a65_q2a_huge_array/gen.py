import random, sys
random.seed(int(sys.argv[1])); n = random.randint(1, 8); q = random.randint(1, 8)
R = [(random.randint(1, 12), random.randint(1, 5)) for _ in range(n)]; S = sum(c for _, c in R)
print(n, q); [print(x, c) for x, c in R]; [print(random.randint(1, S)) for _ in range(q)]
