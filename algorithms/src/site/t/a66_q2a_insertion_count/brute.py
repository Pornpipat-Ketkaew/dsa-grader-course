# literally run the insertion sort from the PDF and count line 07 per value
import sys
d=list(map(int,sys.stdin.read().split())); n,m=d[0],d[1]; A=d[2:2+n]; K=d[2+n:2+n+m]
cnt={}
for pos in range(n-2,-1,-1):
    tmp=A[pos]; i=pos+1
    while i<n and A[i]<tmp:
        cnt[A[i]]=cnt.get(A[i],0)+1; A[i-1]=A[i]; i+=1
    A[i-1]=tmp
for k in K: print(cnt.get(k,0))
