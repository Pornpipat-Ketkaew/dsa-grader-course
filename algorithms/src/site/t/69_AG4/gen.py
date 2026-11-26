import random, sys
random.seed(int(sys.argv[1])); n = random.randint(1, 7); k = random.randint(0, 3)
pairs = [(a, b) for a in range(1, n + 1) for b in range(a + 1, n + 1)]
chain = [(i, i + 1) for i in range(1, n)] if random.random() < .3 else [(random.randint(1, i), i + 1) for i in range(1, n)]
chain = [tuple(sorted(p)) for p in chain]
rest = [p for p in pairs if p not in chain]; random.shuffle(rest)
E = chain + rest[:random.randint(0, len(rest))]; random.shuffle(E)
big = random.random() < .3
print(n, len(E), k)
for a, b in E: print(a, b, random.randint(0, 10**9) if big else random.randint(0, 20))
