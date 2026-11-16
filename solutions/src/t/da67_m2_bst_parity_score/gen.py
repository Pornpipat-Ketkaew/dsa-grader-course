import random,sys
r=random.Random(int(sys.argv[1])); n=r.choice([1,2,3,r.randint(1,15),r.randint(1,200)])
a=[r.randint(0,r.choice([20,1000,2*10**9])) for _ in range(n)]
if r.random()<0.15: a=sorted(set(a),reverse=True); n=len(a)     # "no right children" subtask
print(n, r.randint(0,12)); print(*a)
