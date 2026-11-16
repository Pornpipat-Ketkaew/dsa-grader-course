import sys; d=sys.stdin.read().split(); n=int(d[0]); l=d[1:1+n]; k=int(d[1+n]); sel=sorted(map(int,d[2+n:2+n+k])); pos=int(d[2+n+k])
moved=[l[i] for i in sel]; out=[]
for i in range(n+1):
    if i==pos: out+=moved
    if i<n and i not in sel: out.append(l[i])
print(*out); print(*out[::-1])
