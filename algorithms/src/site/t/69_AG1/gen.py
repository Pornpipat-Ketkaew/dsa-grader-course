import random, sys
random.seed(int(sys.argv[1])); n = random.randint(1, 6); k = random.randint(1, 5)
c = [random.randint(0, n) for _ in range(k)]
print(n, k); print("".join(map(str, c)) if random.random() < 0.3 else " ".join(map(str, c)))
