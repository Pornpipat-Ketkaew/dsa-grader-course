import random,sys; random.seed(int(sys.argv[1])); n=random.randint(1,8); t=random.randint(1,5); print(n,t); print(*[random.randint(1,99) for _ in range(n)])
m=n
for _ in range(t):
    a=random.randrange(m); b=random.randint(a,m-1); print(a,b); m+=b-a+1
