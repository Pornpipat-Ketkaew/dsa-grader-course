import random, sys
random.seed(int(sys.argv[1])); n = random.randint(2, 9); print(n)
for i in range(n-1): print(*[random.choice([0, random.randint(0, 20), 1000]) for _ in range(n-i-1)])
