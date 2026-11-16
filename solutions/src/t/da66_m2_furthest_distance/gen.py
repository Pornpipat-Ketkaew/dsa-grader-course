import random,sys
r=random.Random(int(sys.argv[1])); n=r.choice([0,1,2,3,r.randint(1,12),r.randint(1,200)])
print(n); print(*[r.randint(-r.choice([10,1000]),r.choice([10,1000])) for _ in range(n)])
