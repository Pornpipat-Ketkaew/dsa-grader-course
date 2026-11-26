import random, sys
random.seed(int(sys.argv[1])); R = random.randint(1, 6); C = random.randint(1, 6); T = random.choice([0, 1, 2, 3, random.randint(0, 12), 1000000])
print(R, C, T)
for _ in range(R): print(*[random.choices([0, 1, 2], [6, 1, 2])[0] for _ in range(C)])
