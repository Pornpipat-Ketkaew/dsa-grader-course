import random, sys
random.seed(int(sys.argv[1])); n = random.randint(1, 9)
S = [random.randint(0, 12) for _ in range(n)]; F = [s + random.randint(0, 5) for s in S]
print(n); print(*S); print(*F)
