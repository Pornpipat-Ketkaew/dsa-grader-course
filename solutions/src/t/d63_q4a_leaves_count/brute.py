import sys; d=list(map(int,sys.stdin.read().split())); n=d[0]; t={}
def leaves(): return sum(1 for k in t if k+(0,) not in t and k+(1,) not in t)
def ins(x):
    k=()
    while k in t:
        if t[k]==x: return
        k+=((0,) if x<t[k] else (1,))
    t[k]=x
for x in d[1:1+n]: print("Leaves =",leaves()); ins(x)
print("Leaves =",leaves())
