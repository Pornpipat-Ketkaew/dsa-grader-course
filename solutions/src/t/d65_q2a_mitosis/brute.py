import sys; d=list(map(int,sys.stdin.read().split())); n,t=d[0],d[1]; v=d[2:2+n]; p=2+n
for _ in range(t):
    a,b=d[p],d[p+1]; p+=2; m=len(v); w=[]
    for i in range(m):
        w.append(v[i])
        if a<=m-1-i<=b: w.append(v[i])
    v=w
print(*v)
