import sys; d=list(map(int,sys.stdin.read().split())); n,k,v=d[0],d[1],d[2]; a=d[3:3+n]
s=a[:k]+[v]+a[k:]; p=k          # p = index of the "hot spot"
first=True
while True:
    if not (0<=p<len(s)): break
    c=s[p]; l=p
    while l>0 and s[l-1]==c: l-=1
    r=p
    while r+1<len(s) and s[r+1]==c: r+=1
    if r-l+1<3: break
    s=s[:l]+s[r+1:]
    # beads that meet: s[l-1] and s[l]; they only matter if they have the same colour
    if l-1<0 or l>=len(s) or s[l-1]!=s[l]: break
    p=l
print(*s)
