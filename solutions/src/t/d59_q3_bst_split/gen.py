import random,sys
r=random.Random(int(sys.argv[1])); n=r.choice([0,1,2,r.randint(0,10),r.randint(0,50)]); hi=r.choice([10,100])
print(n); print(*[r.randint(1,hi) for _ in range(n)]); print(r.randint(0,hi+1))
