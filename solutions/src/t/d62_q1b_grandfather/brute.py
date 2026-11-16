import sys; d=list(map(int,sys.stdin.read().split())); n,m=d[0],d[1]; f={}; p=2
for i in range(n): f[d[p+1]]=d[p]; p+=2
g=lambda x: f.get(f.get(x,-1),-1)
for i in range(m):
    a,b=d[p],d[p+1]; p+=2; print("YES" if a!=b and g(a)!=-1 and g(a)==g(b) else "NO")
