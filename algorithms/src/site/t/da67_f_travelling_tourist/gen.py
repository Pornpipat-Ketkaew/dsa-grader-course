import random, sys
random.seed(int(sys.argv[1])); n = random.randint(2, 7)
E = {}
for v in range(2, n + 1): E[(random.randint(1, v - 1), v)] = random.randint(1, 20)   # a spanning tree: connected
for _ in range(random.randint(0, 8)):
    a, b = sorted(random.sample(range(1, n + 1), 2)); E[(a, b)] = random.randint(1, 20)
k = random.randint(2, n); print(n, len(E), k); print(*random.sample(range(1, n + 1), k))
for (a, b), c in E.items(): print(a, b, c)
