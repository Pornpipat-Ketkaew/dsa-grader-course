import random,sys; random.seed(int(sys.argv[1])); n=random.randint(1,15); k=random.randint(1,n); c=random.randint(1,6)
print(n,k); [print("abcdefgh"[random.randrange(c)]*random.randint(1,1)) for _ in range(n)]
