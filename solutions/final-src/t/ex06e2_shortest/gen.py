import random, sys
random.seed(int(sys.argv[1])); n = random.randint(1, 7); s = random.randrange(n)
E = {}
for i in range(1, n): E[(random.randrange(i), i)] = random.randint(-3, 10)   # everything reachable from 0 ...
perm = list(range(n)); random.shuffle(perm)
for _ in range(random.randint(0, 8)):
    a, b = random.randrange(n), random.randrange(n)
    if a != b: E[(a, b)] = random.randint(-4 if random.random() < .3 else 0, 10)
# relabel so vertex s is the old root 0 (keeps every vertex reachable from s)
lab = list(range(n)); lab[0], lab[s] = lab[s], lab[0]
E2 = {(lab[a], lab[b]): w for (a, b), w in E.items()}
print(n, len(E2), s)
for (a, b), w in E2.items(): print(a, b, w)
