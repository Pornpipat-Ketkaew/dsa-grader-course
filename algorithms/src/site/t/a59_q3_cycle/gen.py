import random, sys
random.seed(int(sys.argv[1])); n = random.randint(3, 12)
E = [(random.randrange(i), i) for i in range(1, n)]   # random tree
while True:
    a, b = random.sample(range(n), 2)
    if (a, b) not in E and (b, a) not in E: break
E.append((a, b)); random.shuffle(E)
p = list(range(n)); random.shuffle(p)
print(n)
for a, b in E: print(*((p[a], p[b]) if random.random() < .5 else (p[b], p[a])))
