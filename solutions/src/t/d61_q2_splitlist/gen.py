import random,sys; random.seed(int(sys.argv[1]))
for k in range(3): n=random.randint(0,8); print(n,*[random.randint(1,99) for _ in range(n)])
