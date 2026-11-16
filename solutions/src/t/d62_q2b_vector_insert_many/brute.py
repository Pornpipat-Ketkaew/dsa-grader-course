import sys; d=list(map(int,sys.stdin.read().split())); n=d[0]; v=d[1:1+n]; m=d[1+n]; r=d[2+n:]
ins={r[2*i]:r[2*i+1] for i in range(m)}; out=[]
for i in range(n+1):
    if i in ins: out.append(ins[i])
    if i<n: out.append(v[i])
print(*out)
