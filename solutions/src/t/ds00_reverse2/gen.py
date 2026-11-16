import random,sys; random.seed(int(sys.argv[1])); n=random.randint(1,15); a=random.randint(0,n-1); b=random.randint(a,n-1)
print(n); print(*[random.randint(-50,50) for _ in range(n)]); print(a,b)
