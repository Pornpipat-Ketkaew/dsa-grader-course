import random, sys
r = random.Random(int(sys.argv[1]))
n = r.randint(1, 8); k = r.randint(1, n); M = r.choice([5, 10, 30])
print(n, k)
for _ in range(n):
    l = r.randint(1, M); rr = r.randint(l, M); print(l, rr)
q = r.randint(1, 12); print(q)
for _ in range(q): print(r.randint(1, M + 2))
