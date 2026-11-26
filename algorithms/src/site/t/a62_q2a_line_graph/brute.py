# a component is a line iff we can order its nodes so that consecutive nodes are adjacent
# and there are no other edges (strict: a ring is NOT a line): try every ordering (components here are tiny)
import sys, itertools; sys.path.insert(0, sys.argv[1]); from graphlib import comps
d = list(map(int, sys.stdin.read().split())); v, e = d[0], d[1]; E = [(d[2+2*i], d[3+2*i]) for i in range(e)]
S = {frozenset(x) for x in E}; cnt = 0
for comp in comps(v, E):
    inner = {x for x in S if x <= set(comp)}
    if len(comp) > 8: continue
    for perm in itertools.permutations(comp):
        path = {frozenset((perm[i], perm[i+1])) for i in range(len(perm)-1)}
        cyc = path | {frozenset((perm[0], perm[-1]))} if len(perm) > 2 else path
        if inner == path: cnt += 1; break
print(cnt)
