import sys; d=list(map(int,sys.stdin.read().split()))
def build(v):
    t={}
    for x in v:
        k=()
        while k in t:
            if t[k]==x: break
            k+=((0,) if x<t[k] else (1,))
        else: t[k]=x
    return t
n=d[0]; a=d[1:1+n]; b=d[2+n:]
print("True" if build(a)==build(b) else "False")
