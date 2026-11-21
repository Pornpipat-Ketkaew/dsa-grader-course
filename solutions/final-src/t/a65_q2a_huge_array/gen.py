import random,sys
r=random.Random(int(sys.argv[1])); n=r.randint(1,r.choice([3,10,50])); q=r.randint(1,30)
hi=r.choice([5,100,2*10**9])
g=[(r.randint(1,hi), r.randint(1,r.choice([1,5,1000]))) for _ in range(n)]
S=sum(c for _,c in g)
print(n,q)
for x,c in g: print(x,c)
for _ in range(q): print(r.choice([1,S,r.randint(1,S)]))
