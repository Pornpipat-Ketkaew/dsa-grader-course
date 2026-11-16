import sys; s=[]; t=sys.stdin.read().split(); i=0
while i<len(t):
    c=t[i]; i+=1
    if c=="a": s.append(int(t[i])); i+=1
    elif c=="d": s.pop(0)
    elif c=="k": k=int(t[i]); i+=1; print(f"Data at {k} is {s[k]}")
    elif c=="p": print(f"Queue size = {len(s)} Data =",*s)
    elif c=="q": break
print("Exit")
