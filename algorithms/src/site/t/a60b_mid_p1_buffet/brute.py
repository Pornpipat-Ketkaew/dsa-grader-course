import itertools
f, w, n = map(int, input().split()); food = list(map(int, input().split()))
for c in range(0, n + 1):
    for L in itertools.combinations(range(1, n + 1), c):
        if all(any(abs(x - y) <= w for y in L) for x in food): print(c); raise SystemExit
