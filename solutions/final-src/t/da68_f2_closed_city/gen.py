import random, sys
random.seed(int(sys.argv[1]))
while True:
    n = random.randint(2, 7); E = {}
    for _ in range(random.randint(1, 12)):
        a, b = random.sample(range(1, n + 1), 2); E[(a, b)] = random.randint(1, 20)
    C = random.sample(range(2, n), random.randint(0, max(0, n - 2))) if n > 2 else []
    # keep only inputs where 1 can still reach n
    adj = {}
    for (a, b) in E:
        if a in C or b in C: continue
        adj.setdefault(a, []).append(b); adj.setdefault(b, []).append(a)
    seen = {1}; st = [1]
    while st:
        u = st.pop()
        for v in adj.get(u, []):
            if v not in seen: seen.add(v); st.append(v)
    if n in seen: break
print(n, len(E), len(C)); print(*C)
for (a, b), c in E.items(): print(a, b, c)
