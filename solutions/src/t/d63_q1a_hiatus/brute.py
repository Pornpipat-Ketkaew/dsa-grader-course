import sys; d=list(map(int,sys.stdin.read().split())); n,m=d[0],d[1]; p=[(d[2+2*i],d[3+2*i]) for i in range(n)]; out=[]
for i in range(m):
    q=(d[2+2*n+2*i],d[3+2*n+2*i])
    if q in p: out+=[0,0]
    else:
        b=[x for x in p if x<q]; out+= list(max(b)) if b else [-1,-1]
print(*out)
