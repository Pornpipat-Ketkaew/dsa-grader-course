import random, sys
random.seed(int(sys.argv[1])); n = random.randint(0, 5); m = random.randint(1, 8); st = random.randint(1, 9)
D = random.sample(range(1, 30), n); print(n, m, st)
for a in D: print(a, random.randint(1, 9))
for _ in range(m): print(random.randint(1, 150), random.randint(1, 30))
