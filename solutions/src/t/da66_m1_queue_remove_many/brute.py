import sys; d=list(map(int,sys.stdin.read().split())); n,k=d[0],d[1]; v=d[3:3+n]; p=set(d[3+n:3+n+k]); r=[v[i] for i in range(n) if i not in p]
print(f"Size {len(r)}:",*r); print(*((r+[777])[1:]))
