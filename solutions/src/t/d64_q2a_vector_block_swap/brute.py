import sys; d=list(map(int,sys.stdin.read().split())); n=d[0]; v=d[1:1+n]; a,b,m=d[1+n:4+n]
ok = m>0 and a>=0 and b>=0 and a+m<=n and b+m<=n and (a+m<=b or b+m<=a)
if ok:
    for k in range(m): v[a+k],v[b+k]=v[b+k],v[a+k]
print("result is",int(ok)); print("Size of v is",n); print("v:",*v)
