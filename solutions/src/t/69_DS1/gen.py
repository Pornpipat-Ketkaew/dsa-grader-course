import random,sys
r=random.Random(int(sys.argv[1])); n=r.randint(1,r.choice([3,10,40,200]))
a=r.sample(range(1,r.choice([50,10**9])),n) if n<49 else r.sample(range(1,10**9),n)
if r.random()<0.1: a=sorted(a)[:12]; n=len(a)       # a chain (tall tree, still small)
print(n); print(*a)
