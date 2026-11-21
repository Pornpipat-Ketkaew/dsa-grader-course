import random,sys
r=random.Random(int(sys.argv[1])); n=r.randint(2,r.choice([6,30,300])); m=r.randint(1,min(n,20))
a=list(range(1,n+1)); r.shuffle(a)
if r.random()<0.2: a.sort(reverse=r.random()<0.5)
print(n,m); print(*a); print(*[r.choice(a) for _ in range(m)])
