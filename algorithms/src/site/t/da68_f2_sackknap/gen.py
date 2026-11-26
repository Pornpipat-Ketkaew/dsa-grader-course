import random, sys
random.seed(int(sys.argv[1])); n = random.randint(1, 10); V = random.randint(1, 25)
print(n, V)
for _ in range(n): print(random.randint(1, V), random.randint(1, 50))
