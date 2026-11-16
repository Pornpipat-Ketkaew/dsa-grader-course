import random,sys; random.seed(int(sys.argv[1])); sz=0; L=[]
for _ in range(random.randint(1,40)):
    r=random.random()
    if r<0.4: L.append(f"a {random.randint(1,99)}"); sz+=1
    elif r<0.6 and sz: L.append("d"); sz-=1
    elif r<0.9 and sz: L.append(f"k {random.choice([random.randrange(sz), -random.randint(1,sz)])}")
    else: L.append("p")
L+=["p","q"]; print("\n".join(L))
