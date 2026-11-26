import random, sys
random.seed(int(sys.argv[1]))
def gen(k, c):
    # a valid code of length 2^k with exactly c ones, built top-down
    if k == 1: return random.choice({0: [[0, 0]], 1: [[0, 1], [1, 0]], 2: [[1, 1]]}[c])
    a = random.choice([c // 2, (c + 1) // 2]); b = c - a
    return gen(k - 1, a) + gen(k - 1, b)
k = int(sys.argv[2]) if len(sys.argv) > 2 else random.randint(1, 4)
n = random.randint(2, 15); print(n, k)
for _ in range(n):
    if random.random() < 0.6:
        s = gen(k, random.randint(0, 1 << k))
        if random.random() < 0.3:
            i = random.randrange(len(s)); s[i] ^= 1
    else: s = [random.randint(0, 1) for _ in range(1 << k)]
    print(*s)
