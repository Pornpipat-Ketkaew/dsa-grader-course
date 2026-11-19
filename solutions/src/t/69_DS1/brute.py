import sys
d=list(map(int,sys.stdin.read().split())); n=d[0]; a=d[1:1+n]
pos={}   # key -> heap index, found by walking the BST like insert does
for k in a:
    i=0
    while i in pos.values():
        cur=[x for x,p in pos.items() if p==i][0]
        i = 2*i+1 if k<cur else 2*i+2
    pos[k]=i
m=max(pos.values()); L=0
while (1<<L)-1<=m: L+=1
v=[0]*((1<<L)-1)
for k,i in pos.items(): v[i]=k
print(*v)
