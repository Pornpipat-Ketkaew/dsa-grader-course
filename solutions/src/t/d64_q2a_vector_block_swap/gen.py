import random,sys; random.seed(int(sys.argv[1])); n=random.randint(1,10); print(n); print(*[10*(i+1) for i in range(n)])
print(random.randint(-2,n+1),random.randint(-2,n+1),random.randint(0,5))
