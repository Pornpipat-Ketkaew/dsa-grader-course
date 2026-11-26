# exhaustive: try every assignment of distinct dungeons to the needed items, boss by boss (DFS),
# and report the longest prefix of bosses that can be beaten with power never below 0
import sys
d=list(map(int,sys.stdin.read().split())); p=0
def nx():
    global p; p+=1; return d[p-1]
N,D,T,Z=nx(),nx(),nx(),nx()
dg=[(nx(),nx()) for _ in range(D)]
need=[]
for _ in range(N):
    q=nx(); need.append([nx() for _ in range(q)])
best=0
def go(b, used, power):
    global best
    best=max(best,b)
    if b==N: return
    items=need[b]
    def assign(j, used, power):
        if j==len(items): go(b+1, used, power); return
        for i,(t,z) in enumerate(dg):
            if z==items[j] and not used>>i&1 and power-t>=0:
                assign(j+1, used|1<<i, power-t)
    assign(0, used, power)
go(0,0,T)
print(best)
