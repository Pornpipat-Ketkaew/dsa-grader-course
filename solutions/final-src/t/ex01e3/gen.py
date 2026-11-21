import random, sys
random.seed(int(sys.argv[1]))
n = random.randint(1, 12); m = random.randint(1, 12)
A = sorted(random.sample(range(1, 40), n))
Q = []
for _ in range(m):
    if random.random() < 0.5: Q.append(str(random.randint(0, 45)))
    else: Q.append("%.2f" % random.uniform(0, 45))
print(n, m); print(*A); print(*Q)
