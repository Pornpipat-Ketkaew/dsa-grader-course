import random,sys
r=random.Random(int(sys.argv[1])); K=r.randint(1,7); V=r.choice([2,3,5])
segs=[]; prev=None
for _ in range(K):
    v=r.choice([x for x in range(V) if x!=prev]); segs.append((r.randint(1,4),v)); prev=v
n=sum(l for l,_ in segs); Q=r.randint(1,10)
print(K,Q+1)
for l,v in segs: print(l,v)
for _ in range(Q):
    if r.random()<0.15:
        print("p",0,100)          # always valid: s = 0
    else:
        a=r.randint(0,n-1); b=r.randint(a+1,n); k=r.randint(0,b-a-1); print("r",a,b,k)
print("q")
