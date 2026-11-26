import random; random.seed(1); print(100, 100)
for r in range(100): print(*[random.choice([0, 0, 0, 1, 2]) for _ in range(100)])
