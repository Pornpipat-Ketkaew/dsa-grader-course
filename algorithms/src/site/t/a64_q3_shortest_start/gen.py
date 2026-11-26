# random graph without negative cycles: weight = w0 + pot[a] - pot[b] with w0 >= 0 keeps every cycle >= 0
import random, sys
random.seed(int(sys.argv[1])); n = random.randint(2, 7)
pot = [random.randint(-6, 6) for _ in range(n)]
pairs = [(a, b) for a in range(n) for b in range(n) if a != b]
E = random.sample(pairs, random.randint(1, len(pairs)))
v = random.randrange(n); k = random.randint(1, n)
starts = random.sample(range(n), k)
# make sure v is reachable from some start: add an edge start -> v if needed
reach = set(starts); ch = True
while ch:
    ch = False
    for a, b in E:
        if a in reach and b not in reach: reach.add(b); ch = True
if v not in reach:
    s = starts[0]
    if s != v and (s, v) not in E: E.append((s, v))
print(n, len(E), k); print(v); print(*starts)
for a, b in E: print(a, b, random.randint(0, 5) + pot[a] - pot[b])
