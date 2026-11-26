import random, sys
mode = int(sys.argv[1]); random.seed(mode); n = 5000; m = 100000
E = set()
if mode == 2:
    for i in range(n - 1): E.add((n - 1 - i, n - 2 - i))  # chain 4999->4998->...->0, weight -1
while len(E) < m:
    a, b = random.sample(range(n), 2)
    if mode == 1 and a > b: a, b = b, a       # edges go from small to big: a DAG
    if mode == 2 and a < b: a, b = b, a       # edges go from big to small: a DAG
    E.add((a, b))
E = list(E)
if mode == 2: E.sort(key=lambda e: e[0])      # chain edges near node 0 first: one step per round
print(n, m, 1); print(0 if mode == 2 else n - 1); print(0 if mode == 1 else n - 1)
for a, b in E: print(a, b, -1 if mode == 2 and a == b + 1 else random.randint(-1000, 1000))
