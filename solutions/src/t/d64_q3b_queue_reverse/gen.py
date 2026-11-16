import random,sys; random.seed(int(sys.argv[1])); n=random.randint(1,12); a=random.randrange(n); b=random.randint(a,n-1)
print(n,a,b,random.randint(0,15)); print(*[random.randint(1,99) for _ in range(n)])
