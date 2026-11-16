import sys; n,a=map(int,sys.stdin.read().split()); r=[]
for b in range(n):
    x=b
    while x>a: x=(x-1)//2
    if x==a: r.append(b)
print(len(r)); print(*r)
