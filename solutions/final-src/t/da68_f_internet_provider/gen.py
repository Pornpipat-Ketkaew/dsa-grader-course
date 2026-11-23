import random, sys
random.seed(int(sys.argv[1])); n = random.randint(2, 6); E = {}
for v in range(2, n + 1): E[(random.randint(1, v - 1), v)] = random.randint(1, 9)
for _ in range(random.randint(0, 6)):
    a, b = sorted(random.sample(range(1, n + 1), 2)); E[(a, b)] = random.randint(1, 9)
print(n, len(E), random.randint(1, 3), random.randint(0, n - 1))
for (a, b), d in E.items(): print(*random.choice([(a, b), (b, a)]), d)
