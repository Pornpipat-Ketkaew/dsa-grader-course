import random, sys
random.seed(int(sys.argv[1])); n = random.randint(1, 9); p = random.random()
M = [[0]*n for _ in range(n)]
for i in range(n):
    for j in range(i+1, n):
        if random.random() < p: M[i][j] = M[j][i] = 1
print(n)
for r in M: print(*r)
