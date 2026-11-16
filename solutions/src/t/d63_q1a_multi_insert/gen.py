import random,sys; random.seed(int(sys.argv[1])); n=random.randint(0,8); pos=random.randint(0,n); c=random.randint(0,6)
print(n, random.randint(-1000,1000), pos, c); print(*[random.randint(-9,9) for _ in range(n)])
