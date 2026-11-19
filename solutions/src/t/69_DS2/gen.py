import random,sys
r=random.Random(int(sys.argv[1])); n=r.randint(0,40); G=[1,2,3,123]
print(n)
for _ in range(n):
    c=r.choice("IIEEOMSDD")
    g=r.choice(G); s=r.choice([2,4,6]); k=r.randint(0,12)
    if c in "IE": print(c,k,s,g)
    elif c=="D": print("D")
    else: print(c,g)
