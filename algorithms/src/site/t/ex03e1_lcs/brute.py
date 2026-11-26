import itertools
a = input().strip(); b = input().strip()
def subs(s): return {''.join(c) for r in range(len(s) + 1) for c in itertools.combinations(s, r)}
print(max(len(x) for x in subs(a) & subs(b)))
