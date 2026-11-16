import random,sys
r=random.Random(int(sys.argv[1])); n=r.choice([1,2,3,r.randint(1,15),r.randint(1,60)])
print(n); print(*[r.randint(1,r.choice([10,40,1000])) for _ in range(n)])
