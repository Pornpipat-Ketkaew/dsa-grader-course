n=1000000; h=n//2; a=[]
for i in range(h//2): a+= [i%7+1]*2
a=a+a[::-1]; print(len(a),len(a)//2,1); print(*a)
