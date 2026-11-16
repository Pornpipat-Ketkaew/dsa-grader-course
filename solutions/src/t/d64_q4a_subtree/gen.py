import random,sys
r=random.Random(int(sys.argv[1])); n=r.choice([0,1,2,3,r.randint(0,12),r.randint(0,40)])
print(n); print(*[r.randint(1,30) for _ in range(n)])
