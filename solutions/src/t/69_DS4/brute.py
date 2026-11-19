import sys
t=sys.stdin.read().split(); p=0
def nx():
    global p; p+=1; return t[p-1]
K,Q=int(nx()),int(nx()); arr=[]
for _ in range(K):
    l,v=int(nx()),int(nx()); arr+=[v]*l
def segs():
    s=[]
    for x in arr:
        if s and s[-1][1]==x: s[-1][0]+=1
        else: s.append([1,x])
    return s
def cur(i):
    if i==len(arr): return "- 0"
    j=i
    while j<len(arr) and arr[j]==arr[i]: j+=1
    return f"{arr[i]} {j-i}"
for _ in range(Q):
    c=nx()
    if c=="q": break
    if c=="r":
        a,b,k=int(nx()),int(nx()),int(nx())
        if k: arr[a:b]=arr[b-k:b]+arr[a:b-k]
        print(cur(a),cur(b),len(segs()))
    else:
        s,n=int(nx()),int(nx()); S=segs(); print(len(S),len(arr))
        for l,v in S[s:s+n]: print(l,v)
