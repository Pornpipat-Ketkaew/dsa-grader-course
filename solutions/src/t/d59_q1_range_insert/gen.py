import random,sys; random.seed(int(sys.argv[1])); n1=random.randint(0,7); n2=random.randint(1,6)
po=random.randint(0,n1); fi=random.randint(0,n2); la=random.randint(fi,n2)
print(n1,*[random.randint(0,99) for _ in range(n1)]); print(n2,*[random.randint(100,199) for _ in range(n2)]); print(po,fi,la)
