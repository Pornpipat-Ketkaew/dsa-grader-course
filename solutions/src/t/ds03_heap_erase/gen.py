import random,sys
random.seed(int(sys.argv[1]))
s=set(); out=[]
vals=random.sample(range(1,200),60)
for _ in range(random.randint(5,80)):
    r=random.random()
    if r<0.5 and len(s)<len(vals):
        v=random.choice([x for x in vals if x not in s]); s.add(v); out.append(f"i {v}")
    elif r<0.8 and s:
        v=random.choice(sorted(s)) if random.random()<0.85 else random.choice(vals)
        if v in s: s.remove(v)
        out.append(f"d {v}")
    elif s:
        s.remove(max(s)); out.append("x")
out.append("q")
print("\n".join(out))
