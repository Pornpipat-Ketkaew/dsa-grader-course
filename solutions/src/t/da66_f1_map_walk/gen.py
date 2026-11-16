import random,sys
r=random.Random(int(sys.argv[1])); R,C=r.choice([(1,1),(1,2),(2,1),(2,2),(2,3),(3,2),(3,3),(3,3),(3,3),(2,4),(4,2),(1,5),(5,1)])
p=r.choice([0,0.2,0.4])
g=[[1 if r.random()<p else 0 for _ in range(C)] for _ in range(R)]; g[0][0]=0; g[R-1][C-1]=0
print(R,C)
for row in g: print(*row)
