import random, sys
random.seed(int(sys.argv[1])); n = random.randint(3, 9); print(n, random.randint(0, 50))
for i in range(3, n+1):
    ts = random.sample(range(1, i), random.randint(0, i-1)); print(len(ts), *[x for t in ts for x in (t, random.randint(0, 20))])
