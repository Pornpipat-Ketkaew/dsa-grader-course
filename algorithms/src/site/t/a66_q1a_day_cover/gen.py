import random, sys
random.seed(int(sys.argv[1])); n = random.randint(1, 12); m = random.randint(1, 8)
S = [sorted(random.sample(range(1, n + 1), random.randint(1, n))) for _ in range(m)]
cov = set().union(*S)
for d in range(1, n + 1):           # guarantee an answer exists
    if d not in cov: S[random.randrange(m)] = sorted(set(S[random.randrange(m)]) | {d})
cov = set().union(*S)
for d in range(1, n + 1):
    if d not in cov: S[0] = sorted(set(S[0]) | {d})
print(n, m)
for s in S: print(len(s), *s)
