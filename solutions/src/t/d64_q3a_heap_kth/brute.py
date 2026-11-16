import sys; d=sys.stdin.read().split(); t=int(d[0]); r,k=int(d[1]),int(d[2]); p=3
for _ in range(r):
    n=int(d[p]); p+=1; v=d[p:p+n]; p+=n
    v = v if t==2 else list(map(int,v))
    v=sorted(v,reverse=(t!=3))
    for i in range(k): print(v[i])
