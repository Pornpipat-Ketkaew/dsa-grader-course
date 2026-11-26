import random, sys
random.seed(int(sys.argv[1])); n = random.randint(1, 10); m = random.randint(1, 8)
print(n, m); [print(random.randint(-15, 15), random.randint(-10, 10)) for _ in range(n)]
for _ in range(m): a = random.randint(-12, 12); print(a, a + random.randint(-3, 12))
