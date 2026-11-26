import random,sys; random.seed(int(sys.argv[1])); K=random.randint(3,15); n=random.randint(1,15); m=random.randint(1,15)
kids=random.sample(range(1,K+1),min(n,K)); print(len(kids),m)
for s in kids: print(random.randint(1,K)+10**12 if random.random()<0.1 else random.randint(1,K), s)
for _ in range(m): print(random.randint(1,K),random.randint(1,K))
