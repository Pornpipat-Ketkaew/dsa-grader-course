import sys; d=sys.stdin.read().split(); n=int(d[0]); v=[(d[1+3*i],d[2+3*i],int(d[3+3*i])) for i in range(n)]
f=lambda s: f"Artist: {s[0]} Title: {s[1]} count: {s[2]}"
print("--- Order By Artist-Title-count ---"); [print(f(s)) for s in sorted(v)]
print("--- Order By count-Artist-Title ---"); [print(f(s)) for s in sorted(v,key=lambda s:(-s[2],s[0],s[1]))]
