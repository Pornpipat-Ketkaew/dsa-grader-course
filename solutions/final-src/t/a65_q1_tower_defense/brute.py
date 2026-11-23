import itertools
n, m, k, w = map(int, input().split()); p = list(map(int, input().split())); h = list(map(int, input().split())); t = list(map(int, input().split()))
k = len(t); best = sum(h)
# every tower picks one monster (any, even out of range = no effect, encoded as -1)
for choice in itertools.product(range(-1, m), repeat=k):
    hit = [0] * m
    for i, j in enumerate(choice):
        if j >= 0 and abs(p[j] - t[i]) <= w: hit[j] += 1
    best = min(best, sum(max(0, h[j] - hit[j]) for j in range(m)))
print(best)
