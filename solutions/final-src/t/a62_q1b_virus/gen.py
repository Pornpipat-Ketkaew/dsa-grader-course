import random, sys
random.seed(int(sys.argv[1]))
k = random.randint(1, 4)
def gen(k):
    if k == 1: return [0, 1]
    a, b = gen(k-1), gen(k-1)
    if random.random() < 0.5: a = a[::-1]
    return a + b
n = random.randint(1, 10); print(n, k)
for _ in range(n):
    s = gen(k)
    if random.random() < 0.5:
        for _ in range(random.randint(1, 2)):
            i = random.randrange(len(s)); s[i] ^= 1
    if random.random() < 0.15: s = s[::-1]
    print(*s)
