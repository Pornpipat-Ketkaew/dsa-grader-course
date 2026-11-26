import random, sys
random.seed(7); n = 100000; m = 100000; k = 20; mode = int(sys.argv[1])
E = set()
if mode == 1:                      # a long chain 1-2-...-N plus random extra tunnels
    for i in range(1, n): E.add((i, i + 1))
else:                              # random tree plus random extra tunnels
    for i in range(2, n + 1): E.add((random.randint(max(1, i - 50), i - 1), i))
while len(E) < m:
    a, b = random.sample(range(1, n + 1), 2); E.add((min(a, b), max(a, b)))
print(n, m, k)
print("\n".join(f"{a} {b} {random.randint(0, 10**9)}" for a, b in E))
