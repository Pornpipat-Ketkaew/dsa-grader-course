import sys
d=sys.stdin.read().split(); n=int(d[0]); a=list(map(int,d[1:1+n]))
L={};R={};root=None;keys=set()
def unary():
    return sum(1 for k in keys if (k in L)!=(k in R))
for k in a:
    if root is None: root=k; keys.add(k)
    elif k not in keys:
        c=root
        while True:
            side = L if k<c else R
            if c in side: c=side[c]
            else: side[c]=k; break
        keys.add(k)
    print(f"Size = {len(keys)} unary_count = {unary()}")
