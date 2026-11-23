import random, sys
random.seed(int(sys.argv[1])); n = random.randint(1, 8); p = random.random()
E = [(a, b) for a in range(n) for b in range(a + 1, n) if random.random() < p]
print(n, len(E))
for a, b in E: print(*random.choice([(a, b), (b, a)]))
