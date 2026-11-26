import sys, itertools
data = sys.stdin.read().split(); n, m = int(data[0]), int(data[1]); p = 2; S = []
for _ in range(m):
    k = int(data[p]); S.append(set(map(int, data[p + 1:p + 1 + k]))); p += 1 + k
for size in range(1, m + 1):        # smallest group size first
    if any(set().union(*c) >= set(range(1, n + 1)) for c in itertools.combinations(S, size)):
        print(size); break
