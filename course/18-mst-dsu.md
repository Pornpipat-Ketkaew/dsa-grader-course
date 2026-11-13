# Lesson 18: Graphs III (Minimum Spanning Trees and Union-Find)

> **Goal:** connect all vertices at minimum (or maximum) total cost with Prim's or Kruskal's algorithm, understand *why* they are correct (the cut property), and master the **disjoint-set union (DSU)** data structure.

---

## 1. Why it matters

Problems: `ex06e1_cable`, `a60a_q3_xor_road`, `da68_f_internet_provider`. DSU also solves `a60a_q3_component`, `ex05m1_cycle` and `a62_q2a_line_graph` from Lesson 16.

---

## 2. Spanning trees

A **spanning tree** of a connected undirected graph is a subset of exactly V − 1 edges that connects every vertex and has no cycle. A **minimum spanning tree (MST)** is a spanning tree with the smallest total weight.

### 2.1 The cut property (why the greedy algorithms work)

> For any partition of the vertices into two sides S and V∖S, the **lightest edge crossing the cut** belongs to some MST.

**Proof (exchange):** take an MST T that doesn't contain the light edge e = (u, v). Adding e creates a cycle. That cycle must cross the cut a second time at some edge f, and w(f) ≥ w(e). The tree T + e − f is spanning and no heavier, so it is also an MST, and it contains e.

Both Prim and Kruskal repeatedly add a lightest edge across some cut.

### 2.2 The cycle property

The heaviest edge on any cycle is *not* needed (unless there are ties). This is useful for reasoning such as "remove the K−1 largest MST edges".

---

## 3. Prim's algorithm

Grow one tree from a start vertex. Each step adds the cheapest edge from the tree to a vertex outside it.

### 3.1 O(V²) version (dense or complete graphs, V ≤ ~5000)

```cpp
vector<long long> best(n, INF);   // the cheapest edge connecting v to the tree
vector<bool> in(n, false);
best[0] = 0; long long total = 0;
for (int it = 0; it < n; it++) {
    int u = -1;
    for (int v = 0; v < n; v++) if (!in[v] && (u == -1 || best[v] < best[u])) u = v;
    in[u] = true; total += best[u];
    for (int v = 0; v < n; v++) if (!in[v]) best[v] = min(best[v], w(u, v));
}
```

This is the same shape as the dense Dijkstra, except that `best[v]` is the edge weight, not a path length.

* `ex06e1_cable`: a complete graph given as a triangular matrix (line i lists the costs from i to i+1, …, N−1). Store it in a full symmetric matrix and run Prim in O(N²).
* `a60a_q3_xor_road`: a complete graph on n ≤ 2000 districts with weight(x, y) = code_x XOR code_y, and we want the **maximum** spanning tree. Use the same algorithm with `max` instead of `min` (initialise best = −1, and pick the largest). Compute the weight on the fly, with no matrix needed. The total can exceed 2³¹, so use `long long`.

### 3.2 Heap version (sparse graphs)

As in Dijkstra: push (weight, v) and skip vertices already in the tree. O(E log V).

---

## 4. Kruskal's algorithm

Sort all edges by weight. Scan them, and **add an edge if it joins two different components**, which DSU checks. Stop after V − 1 edges.

```cpp
sort(edges.begin(), edges.end());                // (w, u, v)
DSU d(n); long long total = 0; vector<long long> used;
for (auto [w, u, v] : edges)
    if (d.unite(u, v)) { total += w; used.push_back(w); }
// if used.size() < n-1, the graph is disconnected
```

O(E log E) for the sort.

### 4.1 MST with K free "modems" (`da68_f_internet_provider`)

Cities connected by UTP cable cost U × length. K modems can be placed in any cities, and all the modem cities are connected to each other for free. What is the minimum cost to connect everything?

**Think:** placing K modems is like adding free edges that join K components into one. The best strategy is to build the MST, then **remove its K − 1 most expensive edges**. That splits the tree into K components, and putting one modem in each component reconnects them for free. (With K ≤ 1 the modems are useless and the answer is the full MST.) The answer is U × (the sum of the remaining edge lengths). The cycle property explains why the removed edges should be the heaviest ones.

Check: whether K can exceed N, and whether the input graph is guaranteed connected (if not, the modems must also bridge the components).

---

## 5. Disjoint-set union (union-find)

It maintains a partition of {0..n−1} with two operations, `find(x)` (the representative of x's set) and `unite(a, b)`.

```cpp
struct DSU {
    vector<int> p, sz;
    DSU(int n) : p(n), sz(n, 1) { iota(p.begin(), p.end(), 0); }
    int find(int x) {                       // path compression (iterative = no deep recursion)
        while (p[x] != x) { p[x] = p[p[x]]; x = p[x]; }
        return x;
    }
    bool unite(int a, int b) {              // union by size
        a = find(a); b = find(b);
        if (a == b) return false;           // already in the same set: this edge would close a cycle
        if (sz[a] < sz[b]) swap(a, b);
        p[b] = a; sz[a] += sz[b];
        return true;
    }
};
```

With path compression and union by size, each operation takes **amortized α(n)**, practically constant.

**Uses:**

* the number of components = n − (the number of successful unites),
* cycle detection in an undirected graph: `unite` returns false,
* Kruskal,
* grouping offline ("are a and b connected after these edges?").

---

## 6. Prim vs Kruskal

| | Prim O(V²) | Prim + heap | Kruskal |
|---|---|---|---|
| best when | dense / complete graph | sparse, adjacency list | sparse, edge list |
| time | O(V²) | O(E log V) | O(E log E) |
| memory | O(V) if the weights are computed on the fly | O(V + E) | O(E) |

For a complete graph on 2000 vertices, E ≈ 2·10⁶, so Kruskal would sort 2·10⁶ edges (OK but slower and heavier), while Prim O(V²) = 4·10⁶ steps with no storage. **Prefer Prim for complete graphs.**

---

## 7. Common traps

1. The **maximum** spanning tree: flip the comparisons (or negate the weights).
2. Reading the triangular matrix incorrectly (`ex06e1_cable`).
3. `int` overflow of the total.
4. Forgetting that Kruskal needs `find` with path compression (otherwise it is O(n) per find on chains).
5. A disconnected input graph: decide what the problem wants.

---

## 8. Grader problems for this lesson

| Problem | Hint |
|---|---|
| `ex06e1_cable` | Prim O(N²) on the triangular input |
| `a60a_q3_xor_road` | maximum spanning tree, Prim O(n²) with XOR weights computed on the fly |
| `da68_f_internet_provider` | Kruskal, drop the K−1 heaviest MST edges, multiply by U |
| (revisit) `a60a_q3_component`, `ex05m1_cycle` | DSU versions |

---

## 9. Exercises

1. Find the MST of the 4-vertex graph with weights (0-1: 1), (0-2: 3), (0-3: 4), (1-2: 2), (1-3: 7), (2-3: 6). (This is sample 1 of `ex06e1_cable`.)
2. Prove that if all edge weights are distinct, the MST is unique.
3. Run DSU on unions (0,1), (2,3), (1,3), (0,2). Which call returns false?
4. With an MST whose edge weights are {2, 3, 5, 9} and K = 3 modems, what is the cost (with U = 1)?

### Answers

1. The edges 0-1 (1), 1-2 (2) and 0-3 (4), total **7** ✓.
2. Suppose there were two different MSTs. Take the lightest edge e in one but not the other. Adding e to the other creates a cycle containing an edge f not in the first tree, with w(f) > w(e) (the weights are distinct, and f is heavier because of how e was chosen). Swapping f for e gives a lighter tree, which is a contradiction.
3. (0,2): after the first three unions, 0, 1, 2 and 3 are all in one set.
4. Remove the K − 1 = 2 heaviest edges (9 and 5). The cost is 2 + 3 = **5**.
