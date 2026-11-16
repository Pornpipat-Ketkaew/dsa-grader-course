import sys
d=sys.stdin.read().split(); n=int(d[0]); a=list(map(int,d[1:1+n]))
L={};R={};D={};root=None
for k in a:
    if root is None: root=k; D[k]=0; continue
    if k in D: continue
    c=root
    while True:
        s=L if k<c else R
        if c in s: c=s[c]
        else: s[c]=k; D[k]=D[c]+1; break
print(sum(D[k] for k in D if k not in L and k not in R))
