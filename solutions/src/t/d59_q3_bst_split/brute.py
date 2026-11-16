import sys
sys.setrecursionlimit(10000)
d=sys.stdin.read().split(); n=int(d[0]); a=list(map(int,d[1:1+n])); val=int(d[1+n])
class N:
    def __init__(s,k): s.k=k;s.l=None;s.r=None
def ins(t,k):
    if t is None: return N(k)
    if k<t.k: t.l=ins(t.l,k)
    elif k>t.k: t.r=ins(t.r,k)
    return t
root=None
for k in a: root=ins(root,k)
def split(t):               # textbook recursive split: (keys < val, keys >= val)
    if t is None: return None,None
    if t.k<val:
        l,r=split(t.r); t.r=l; return t,r
    l,r=split(t.l); t.l=r; return l,t
def pr(t): return "" if t is None else "("+pr(t.r)+")"+f"{t.k}:{-t.k}"+"["+pr(t.l)+"]"
L,R=split(root); print(pr(L)); print(pr(R)); print("OK")
