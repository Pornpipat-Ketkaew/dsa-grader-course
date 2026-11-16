import random,sys; random.seed(int(sys.argv[1])); out=[]; n=0
for _ in range(random.randint(1,8)):
    r=random.random()
    if r<0.45:
        k=random.randint(0,6); out.append("a %d %s"%(k," ".join(str(random.randint(0,99)) for _ in range(k)))); n+=k
    elif r<0.8 and n>0:
        k=random.randint(0,n); ps=sorted(random.sample(range(n),k)); out.append("e %d %s"%(k," ".join(map(str,ps)))); n-=k
    else: out.append("p")
out.append("p"); out.append("q"); print("\n".join(out))
