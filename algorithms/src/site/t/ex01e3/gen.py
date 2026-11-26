import random, sys
random.seed(int(sys.argv[1])); n = random.randint(1, 12); m = random.randint(1, 12)
A = sorted(random.sample(range(1, 60), n)); print(n, m); print(*A)
print(*[random.choice([str(random.randint(0, 65)), f"{random.uniform(0, 65):.2f}"]) for _ in range(m)])
