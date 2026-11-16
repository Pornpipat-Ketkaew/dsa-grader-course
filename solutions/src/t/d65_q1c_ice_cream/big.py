import random; n=40000; m=100000; print(n,m,1000)
for a in random.sample(range(1,100001),n): print(a,random.randint(1,1000))
for _ in range(m): print(random.randint(1,2**20),random.randint(1,100000))
