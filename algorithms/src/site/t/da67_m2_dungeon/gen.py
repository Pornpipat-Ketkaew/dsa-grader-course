import random,sys
r=random.Random(int(sys.argv[1])); N=r.randint(1,5); D=r.randint(1,7); Z=r.randint(1,3); T=r.randint(0,40)
print(N,D,T,Z)
for _ in range(D): print(r.randint(0,min(T,15)) if T else 0, r.randrange(Z))
for _ in range(N):
    q=r.randint(0,min(Z,2)); its=r.sample(range(Z),q); print(q,*its)
