import random; random.seed(3); n = 100
print(n, n * (n - 1) // 2); print(*[random.randint(-1000, 1000) for _ in range(n)])
for a in range(n):
    for b in range(a + 1, n): print(a, b, random.randint(1, 1000))
