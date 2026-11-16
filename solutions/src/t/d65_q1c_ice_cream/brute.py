import sys
data=sys.stdin.read().split(); it=iter(data)
n,m,start=int(next(it)),int(next(it)),int(next(it))
ch={}
for _ in range(n):
    a=int(next(it)); s=int(next(it)); ch[a]=s
out=[]
for _ in range(m):
    P=int(next(it)); X=int(next(it))
    rate=start; money=0; d=0
    while True:
        if d in ch: rate=ch[d]
        money+=rate
        if money>=P: out.append(d); break
        if d==X: money=0
        d+=1
print(*out)
