import random, sys
random.seed(int(sys.argv[1])); T = random.randint(1, 5); print(T)
for _ in range(T):
    n = random.randint(1, 8); E = set(); e = random.randint(1, 9)
    tries = 0
    while len(E) < e and tries < 200:
        tries += 1; a, b = random.randrange(n), random.randrange(n)
        if a != b and (a, b) not in E and (b, a) not in E: E.add((a, b))
    if not E:   # E >= 1 is required; use a 2-node graph instead
        n = max(n, 2); E = {(0, 1)}
    print(n, len(E))
    for a, b in E: print(a, b)
