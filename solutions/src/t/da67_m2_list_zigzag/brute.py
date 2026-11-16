import sys; d=list(map(int,sys.stdin.read().split())); n=d[0]; a=d[1:1+n]; m=d[1+n]; b=d[2+n:2+n+m]; r=[]
for i in range(max(n,m)):
    if i<n: r.append(a[i])
    if i<m: r.append(b[i])
print(f"{len(r)}:",*r,"|",*r[::-1]); print("same nodes ls 0 empty")
