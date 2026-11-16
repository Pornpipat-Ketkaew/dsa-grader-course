import sys
d=sys.stdin.read().split(); n=int(d[0]); dd=int(d[1]); a=list(map(int,d[2:2+n]))
D={};L={};R={};root=None
for k in a:
    if root is None: root=k; D[k]=0; continue
    if k in D: continue
    c=root
    while True:
        s=L if k<c else R
        if c in s: c=s[c]
        else: s[c]=k; D[k]=D[c]+1; break
odd=sum(1 for k in D if D[k]<=dd and k%2==1); even=sum(1 for k in D if D[k]<=dd and k%2==0)
print(abs(odd-even))
