import random,sys
r=random.Random(int(sys.argv[1])); x=r.randint(1,3); V=r.choice([3,6,50])
fr=r.randint(-V,V); to=r.choice([fr, r.randint(-V,V)])
def iv(): return r.randint(-V,V)
def s(): return "".join(r.choice("abc") for _ in range(r.randint(1,3)))
out=[f"{x} {fr} {to}"]
if x==1:
    S=r.randint(0,4); out.append(str(S))
    for _ in range(S):
        vs=r.randint(0,4); out.append(str(vs))
        for _ in range(vs):
            q=[iv() for _ in range(r.randint(0,5))]; out.append(" ".join(map(str,[len(q)]+q)))
elif x==2:
    M=r.randint(0,5); out.append(str(M))
    for _ in range(M):
        out.append(s()); q=[iv() for _ in range(r.randint(0,5))]; out.append(" ".join(map(str,[len(q)]+q))); out.append(str(iv()))
else:
    S=r.randint(0,5); out.append(str(S))
    for _ in range(S):
        l=[iv() for _ in range(r.randint(0,4))]; out.append(" ".join(map(str,[len(l)]+l)))
        keys=[k for k in range(-V,V+1) if k!=to]; ks=r.sample(keys, min(len(keys), r.randint(0,4)))
        if fr in ks and to in ks: ks.remove(to)
        out.append(str(len(ks)))
        for k in ks: out.append(f"{k} {iv()} {s()}")
print("\n".join(out))
