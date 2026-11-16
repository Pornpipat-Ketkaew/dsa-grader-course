import sys; d=list(map(int,sys.stdin.read().split())); n1=d[0]; v1=d[1:1+n1]; n2=d[1+n1]; v2=d[2+n1:2+n1+n2]; po,fi,la=d[2+n1+n2:5+n1+n2]
v1[po:po]=v2[fi:la]; print("Result"); print(*v1)
