import random, sys
random.seed(int(sys.argv[1])); n = random.randint(2, 7)
pairs = [(a, b) for a in range(n) for b in range(a + 1, n)]; random.shuffle(pairs)
tree = [(random.randrange(i), i) for i in range(1, n)]       # guarantees connectivity
rest = [p for p in pairs if p not in tree]; E = tree + rest[:random.randint(0, len(rest))]
random.shuffle(E); H = [random.randint(-50, 50) for _ in range(n)]
print(n, len(E)); print(*H)
for a, b in E: print(*((a, b) if random.random() < .5 else (b, a)), random.randint(1, 60))
