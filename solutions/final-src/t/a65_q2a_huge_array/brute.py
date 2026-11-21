import sys
d=list(map(int,sys.stdin.read().split())); n,q=d[0],d[1]
arr=[]
for i in range(n): arr+= [d[2+2*i]]*d[3+2*i]
arr.sort()
for j in range(q): print(arr[d[2+2*n+j]-1])
