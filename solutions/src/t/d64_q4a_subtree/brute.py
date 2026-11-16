import sys
d=sys.stdin.read().split(); n=int(d[0]); a=list(map(int,d[1:1+n]))
class N:
    def __init__(s,k,v): s.k=k;s.v=v;s.l=None;s.r=None
root=None; cnt=0
for i,k in enumerate(a):
    if root is None: root=N(k,i); cnt=1; continue
    c=root
    while True:
        if k==c.k: c.v=i; break
        nx = c.l if k<c.k else c.r
        if nx is None:
            if k<c.k: c.l=N(k,i)
            else: c.r=N(k,i)
            cnt+=1; break
        c=nx
def pr(t):
    if t is None: return ""
    return "("+pr(t.r)+")"+f"{t.k}:{t.v}"+"["+pr(t.l)+"]"
def sz(t): return 0 if t is None else 1+sz(t.l)+sz(t.r)
def show(name,size,t): print(name+f" ======== size = {size} ========= "); print(pr(t))
if root is None:
    print("return: 0:0"); show("main tree: ",0,None); show("left tree: ",0,None); show("right tree:",0,None)
else:
    L,R=root.l,root.r; root.l=root.r=None
    print(f"return: {root.k}:{root.v}"); show("main tree: ",1,root); show("left tree: ",sz(L),L); show("right tree:",sz(R),R)
