import random, sys
random.seed(int(sys.argv[1])); n = random.randint(1, 9)
E = set((random.randrange(i), i) for i in range(1, n))
m = len(E) + random.randint(0, 5)
while len(E) < m and len(E) < n*(n-1)//2:
    a, b = sorted(random.sample(range(n), 2)); E.add((a, b))
k = random.randint(1, n); S = random.sample(range(n), k)
print(n, len(E), k); print(*S); print(*[random.randint(1, 20) for _ in range(n)])
for a, b in E: print(a, b)
