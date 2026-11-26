# independent check: try EVERY command string over {A,B,C} up to length R*C-1, simulate the rules,
# keep the ones that end exactly on (R,C), sort alphabetically
import sys, itertools
d=list(map(int,sys.stdin.read().split())); R,C=d[0],d[1]; g=[d[2+i*C:2+(i+1)*C] for i in range(R)]
mv={'A':(0,1),'B':(1,0),'C':(-1,0)}; res=[]
for L in range(0,R*C):
    for s in itertools.product('ABC',repeat=L):
        r=c=0; seen={(0,0)}; ok=True
        for i,ch in enumerate(s):
            if (r,c)==(R-1,C-1): ok=False; break        # game already over
            dr,dc=mv[ch]; r+=dr; c+=dc
            if not(0<=r<R and 0<=c<C) or g[r][c] or (r,c) in seen: ok=False; break
            seen.add((r,c))
        if ok and (r,c)==(R-1,C-1): res.append("".join(s))
for s in sorted(res): print(s)
print("DONE")
