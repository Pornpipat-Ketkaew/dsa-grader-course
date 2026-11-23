import random, sys
random.seed(int(sys.argv[1])); n = random.randint(1, 6)
print(random.choice([random.randint(1, 20), round(random.uniform(1, 20), 1)]), n)
print(*[random.randint(1, 20) for _ in range(n)]); print(*[random.randint(1, 10) for _ in range(n)])
