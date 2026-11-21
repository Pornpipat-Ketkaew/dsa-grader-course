import random, sys
random.seed(int(sys.argv[1]))
n = random.randint(1, 10); m = random.randint(1, 10); k = random.choice([0, 0, 1, 2, 5, 1000])
A = [random.choice([0, random.randint(0, 9), 1000]) for _ in range(n)]
print(n, m, k); print(*A)
for _ in range(m): print(random.randint(0, n-1), random.choice([0, random.randint(0, 40), random.randint(0, 5000), 10**12]))
