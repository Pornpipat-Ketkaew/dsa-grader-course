import random,sys; random.seed(int(sys.argv[1])); n=random.randint(1,12); s=set()
while len(s)<n: s.add((random.choice(["Queen","Beatles","ABBA"]),random.choice("ABCD")))
print(n); [print(a,t,random.randint(1,4)) for a,t in s]
