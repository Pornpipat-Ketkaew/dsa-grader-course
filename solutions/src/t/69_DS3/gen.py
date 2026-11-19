import random,sys
r=random.Random(int(sys.argv[1])); V=r.choice([2,5,100])
a=r.randint(0,8); b=r.randint(0,8)
Q={'A':[r.randint(-V,V) for _ in range(a)],'B':[r.randint(-V,V) for _ in range(b)]}
print(a,b)
if a: print(*Q['A'])
if b: print(*Q['B'])
def fuse(m,k):
    X,Y=Q[m],Q[k]; L=max(len(X),len(Y)); X2=[None]*(L-len(X))+X; Y2=[None]*(L-len(Y))+Y; res=[]
    for x,y in zip(X2,Y2):
        if x is None: res.append(y)
        elif y is None: res.append(x)
        elif x+y!=0: res.append(x+y)
    Q[m]=res
    if m!=k: Q[k]=[]
for _ in range(r.randint(1,15)):
    c=r.choice("iiioffls"); m=r.choice("AB")
    if c in "os" and not Q[m]: c="i"
    if c=="i": v=r.randint(-V,V); Q[m].append(v); print("i",m,v)
    elif c=="o": Q[m].pop(0); print("o",m)
    elif c=="f": k=r.choice("AB"); fuse(m,k); print("f",m,k)
    else: print(c,m)
print("q")
