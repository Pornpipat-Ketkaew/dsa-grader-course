import random, sys
random.seed(int(sys.argv[1])); v = random.randint(1, 12); e = random.randint(0, 14)
E = set()
while len(E) < e and len(E) < v*(v-1)//2:
    a, b = random.randint(1, v), random.randint(1, v)
    if a != b and (a, b) not in E and (b, a) not in E: E.add((a, b))
print(v, len(E))
for a, b in E: print(a, b)
