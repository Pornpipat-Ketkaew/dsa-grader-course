import random,sys
r=random.Random(int(sys.argv[1])); n=r.randint(1,40); W=r.choice([10,30,60])
print(n)
for _ in range(n):
    if r.random()<0.3: print(2)
    else:
        a=r.randint(1,W); b=r.randint(a,min(W,a+r.choice([0,2,10]))); print(1,a,b)
