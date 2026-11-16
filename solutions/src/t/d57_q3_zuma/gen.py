import random,sys; random.seed(int(sys.argv[1])); n=random.randint(1,14); c=random.randint(1,3)
a=[random.randint(1,c) for _ in range(n)]; print(n,random.randint(0,n),random.randint(1,c)); print(*a)
