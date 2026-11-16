import random,sys; random.seed(int(sys.argv[1])); n=random.randint(1,12); k=random.randint(1,n)
print(n,k,random.randint(0,15)); print(*[random.randint(1,99) for _ in range(n)]); print(*random.sample(range(n),k))
