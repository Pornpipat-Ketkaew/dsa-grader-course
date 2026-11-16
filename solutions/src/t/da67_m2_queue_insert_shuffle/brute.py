import sys; d=list(map(int,sys.stdin.read().split())); n,m,p=d[0],d[1],d[2]; v=d[4:4+n]; it=d[4+n:4+n+m]
r=v[:p]; a=v[p:]
while a and it: r.append(it.pop(0)); r.append(a.pop(0))
r+=a+it; print(*r); print(*((r+[777])[1:]))
