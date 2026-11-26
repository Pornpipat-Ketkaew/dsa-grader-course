import random, sys
random.seed(int(sys.argv[1])); n = random.randint(2, 8); m = random.randint(2, 8)
P = random.sample([(y, mo) for y in range(1, 5) for mo in range(1, 13)], n); random.shuffle(P)
print(n, m); [print(*p) for p in P]; [print(random.randint(1, 5), random.randint(1, 12)) for _ in range(m)]
