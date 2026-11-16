import random,sys; random.seed(int(sys.argv[1]))
s=lambda: "".join(random.choice("ab") for _ in range(random.randint(1,3)))
print(random.randint(1,3),s()); print(random.randint(1,3),s())
