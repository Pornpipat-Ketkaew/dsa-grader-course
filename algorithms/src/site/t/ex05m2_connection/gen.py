import random, sys
random.seed(int(sys.argv[1])); n = random.randint(2, 10); K = random.randint(1, 4); E = set(); e = random.randint(1, 15)
tries = 0
while len(E) < e and tries < 300:
    tries += 1; a, b = sorted(random.sample(range(n), 2)); E.add((a, b))
print(n, len(E), K)
for a, b in E: print(a, b)
