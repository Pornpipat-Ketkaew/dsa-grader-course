import random,sys
r=random.Random(int(sys.argv[1])); n=r.choice([0,1,2,3,7,r.randint(1,20),r.randint(1,300)])
print(n); print(*[r.randint(1,r.choice([10,100,10**9])) for _ in range(n)])
