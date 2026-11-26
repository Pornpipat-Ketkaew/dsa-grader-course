import random, sys
random.seed(int(sys.argv[1])); n = random.randint(2, 9); E = set()
for v in range(2, n + 1): E.add((random.randint(1, v - 1), v))
for _ in range(random.randint(0, 6)):
    a, b = sorted(random.sample(range(1, n + 1), 2)); E.add((a, b))
print(n, len(E), random.randint(1, n))
for a, b in E: print(*random.choice([(a, b), (b, a)]))
