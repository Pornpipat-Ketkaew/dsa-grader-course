# brute force: build the BST, then BFS from EVERY node over the undirected tree
import sys
from collections import deque
d=sys.stdin.read().split(); n=int(d[0]); a=list(map(int,d[1:1+n]))
adj={};root=None;L={};R={}
for k in a:
    if root is None: root=k; adj[k]=[]; continue
    if k in adj: continue
    c=root
    while True:
        s=L if k<c else R
        if c in s: c=s[c]
        else: s[c]=k; adj[k]=[c]; adj[c].append(k); break
if not adj: print(-1); sys.exit()
best=0
for s in adj:
    dist={s:0}; q=deque([s])
    while q:
        u=q.popleft()
        for v in adj[u]:
            if v not in dist: dist[v]=dist[u]+1; q.append(v)
    best=max(best,max(dist.values()))
print(best)
