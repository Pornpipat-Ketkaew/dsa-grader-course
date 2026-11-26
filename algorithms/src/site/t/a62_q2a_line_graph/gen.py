import random, sys
random.seed(int(sys.argv[1])); v = random.randint(2, 8); E = set(); e = random.randint(0, 12)
tries = 0
while len(E) < e and tries < 300:
    tries += 1; a, b = random.randrange(v), random.randrange(v)
    if a != b and (a, b) not in E and (b, a) not in E: E.add((a, b))
print(v, len(E))
for a, b in E: print(a, b)
