import sys
t=sys.stdin.read().split(); n=int(t[0]); p=1; G={}; out=[]
for _ in range(n):
    c=t[p]; p+=1
    if c in "IE":
        k,s,g=int(t[p]),int(t[p+1]),int(t[p+2]); p+=3
        rooms=G.setdefault(g,[])
        if c=="E":
            for rm in rooms:
                add=min(k,rm[0]-rm[1]); rm[1]+=add; k-=add
        while k>0:
            x=min(k,s); rooms.append([s,x]); k-=x
    elif c=="D":
        out.append(f"{sum(len(v) for v in G.values())} {sum(r[1] for v in G.values() for r in v)}")
    else:
        g=int(t[p]); p+=1
        if g not in G: continue
        if c=="O": del G[g]
        elif c=="M":
            if G[g]: G[g]=[[sum(r[0] for r in G[g]), sum(r[1] for r in G[g])]]
        else:
            new=[]
            for s_,x in G[g]:
                if x<=1: new.append([s_,x])
                else: new+= [[s_,(x+1)//2],[s_,x//2]]
            G[g]=new
print("\n".join(out))
