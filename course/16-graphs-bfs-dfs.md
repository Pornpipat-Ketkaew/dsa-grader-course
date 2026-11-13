# Lesson 16: Graphs I (Representations, BFS, DFS, Components, Cycles and Grids)

> **Goal:** store graphs efficiently, and use BFS and DFS to answer reachability, connectivity, cycle and shortest-unweighted-distance questions on general graphs and on **grids**.

---

## 1. Why it matters

Problems: `d57_q1_dense`, `d57_q1_sparse`, `a65_q0_degrees`, `a60a_q3_component`, `ex05m1_cycle`, `a59_q3_cycle`, `a62_q2a_line_graph`, `ex05m2_connection`, `da68_f_k_connected_city`, `a62_q2a_pandemic`, `da67_f_border_extend`, `da66_f1_sea_bridge`, `da66_f2_grid_loop`.

---

## 2. Vocabulary

* A graph G = (V, E). It is **directed** if the edges have a direction and **undirected** otherwise. It is **weighted** if the edges have costs.
* The **degree** of v is the number of incident edges (in a directed graph: in-degree and out-degree).
* A **path** is a sequence of vertices joined by edges; it is **simple** if no vertex repeats. A **cycle** is a path that returns to its start.
* A **connected component** is a maximal set of mutually reachable vertices (undirected).
* A **tree** is connected and acyclic, and has exactly |V| − 1 edges.
* **Handshake lemma:** Σ deg(v) = 2|E|.

---

## 3. Representations

| Representation | Memory | Edge check | List the neighbours of v | Best for |
|---|---|---|---|---|
| adjacency matrix `bool adj[n][n]` | O(V²) | O(1) | O(V) | dense graphs, V ≤ ~5000 |
| adjacency list `vector<vector<int>> g` | O(V + E) | O(deg) | O(deg) | sparse graphs (almost always) |
| adjacency sets `vector<set<int>>` | O(V + E) | O(log deg) | O(deg) | sparse graphs + edge deletion/check |
| edge list `vector<tuple<w,u,v>>` | O(E) | O(E) | n/a | Kruskal, Bellman-Ford |

### 3.1 The DenseGraph / SparseGraph classes (`d57_q1_dense`, `d57_q1_sparse`)

You implement constructors, a copy constructor, `AddEdge` (no duplicates), `RemoveEdge`, `DoesEdgeExist` and `Transpose` (reverse every edge).

* **Dense** (V ≤ 1000): `vector<vector<bool>> m(n, vector<bool>(n))`. `Transpose` builds `t.m[j][i] = m[i][j]`, which is O(V²). The default constructor creates **3** vertices (read the statement).
* **Sparse** (V ≤ 10⁵, E ≤ 5·10⁵): `vector<set<int>> adj(n)`. `AddEdge` is `adj[a].insert(b)` (sets ignore duplicates), `RemoveEdge` is `adj[a].erase(b)`, and `DoesEdgeExist` is `adj[a].count(b)`, all O(log). `Transpose` loops over every edge (a → b) and inserts b → a into a new graph, O(E log). Don't use a matrix: 10¹⁰ cells.
* Copy constructor: copying the vector members (`= G.adj`) is enough.

### 3.2 Reading an adjacency matrix fast (`a65_q0_degrees`)

That's 25·10⁶ numbers: `ios::sync_with_stdio(false)`. The degree is the row sum.

---

## 4. Breadth-first search (BFS)

**What it gives:** from a source s, the vertices in order of their **number of edges** from s. So `dist[v]` = the shortest path length in an *unweighted* graph.

```cpp
vector<int> dist(n, -1);
queue<int> q;
dist[s] = 0; q.push(s);
while (!q.empty()) {
    int u = q.front(); q.pop();
    for (int v : g[u]) if (dist[v] == -1) {
        dist[v] = dist[u] + 1;
        q.push(v);
    }
}
```

**Why it is correct:** the queue holds vertices in nondecreasing order of distance (layers d, then d+1). The first time v is discovered is through a shortest path. Every vertex is pushed once and every edge examined once (twice if undirected), so it runs in **O(V + E)**.

### 4.1 BFS with a depth limit (`ex05m2_connection`)

"How many vertices are within distance K (K ≤ 4)?", maximised over all start vertices: run a BFS from every vertex, stopping when dist > K. That's O(V·(V + E)) in the worst case, and fine for the given limits.

### 4.2 Multi-source BFS

Push **all sources** with distance 0 at the start. Then `dist[v]` = the distance to the *nearest* source. This is used in:

* `a62_q2a_pandemic`: the infected cells spread for T days and mountains block them. Count the cells with dist ≤ T.
* `da67_f_border_extend`: water cells within distance k of land become land. The sources are all the land cells, and the spread is 4-directional (read whether it may pass over other cells).
* `da66_f1_sea_bridge`: the minimum number of road cells connecting country 1 to country 2 while avoiding volcanoes. The sources are all the cells of country 1; BFS through passable cells until you reach any cell of country 2. The answer is the distance minus 1 (or whatever counting convention the statement uses). The grid can be up to 5000 × 5000, so store it as `vector<string>` or a `char` array, use an `int` dist array (100 MB?), and **check the memory limit**. You can store the distance per BFS layer instead, by processing layer by layer with two queues, and keep only a visited bitset/char.

### 4.3 BFS on a grid

```cpp
int dr[4] = {-1, 1, 0, 0}, dc[4] = {0, 0, -1, 1};
// encode a cell as r * C + c to keep the queue small
queue<int> q;
// for each source: dist[r][c] = 0, q.push(r * C + c)
while (!q.empty()) {
    int cur = q.front(); q.pop();
    int r = cur / C, c = cur % C;
    for (int k = 0; k < 4; k++) {
        int nr = r + dr[k], nc = c + dc[k];
        if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;   // outside the grid
        if (blocked(nr, nc) || dist[nr][nc] != -1) continue;
        dist[nr][nc] = dist[r][c] + 1;
        q.push(nr * C + nc);
    }
}
```

### 4.4 The first K vertices of a BFS (`da68_f_k_connected_city`)

Output any K vertices that induce a connected subgraph. The first K vertices discovered by BFS (or DFS) from any vertex are connected, because each one was discovered from an earlier one.

---

## 5. Depth-first search (DFS)

```cpp
vector<vector<int>> g; vector<bool> vis;
void dfs(int u) {
    vis[u] = true;
    for (int v : g[u]) if (!vis[v]) dfs(v);
}
```

O(V + E). For V ≥ 10⁵ on a path-like graph, the recursion depth can overflow the stack, so use an **explicit stack** or BFS when you only need reachability.

### 5.1 Counting connected components (`a60a_q3_component`)

```cpp
int comps = 0;
for (int v = 0; v < n; v++) if (!vis[v]) { comps++; dfs(v); }   // or BFS, or DSU (Lesson 18)
```

### 5.2 Cycle detection in an undirected graph (`ex05m1_cycle`)

During DFS, if you see an already-visited neighbour **that is not the parent**, there is a cycle.

```cpp
bool dfs(int u, int parent) {
    vis[u] = true;
    for (int v : g[u]) {
        if (v == parent) continue;            // careful: with multi-edges, skip only one copy
        if (vis[v] || dfs(v, u)) return true;
    }
    return false;
}
```

Alternatives: union-find (an edge joining two vertices already in the same set closes a cycle), or count the edges: a component with E ≥ V has a cycle. **Reset everything for each of the T test cases.**

(For **directed** graphs, use three colours, white/grey/black. A cycle exists iff you meet a *grey* vertex.)

### 5.3 The length of the unique cycle (`a59_q3_cycle`)

The graph is connected with n vertices and n edges, so it contains exactly one cycle ("unicyclic"). **Peel the leaves:** repeatedly remove vertices of degree 1 (a queue, like Kahn's algorithm). The vertices that remain form the cycle, so its length = the number remaining. This takes O(n) and needs no recursion.

### 5.4 Classifying components (`a62_q2a_line_graph`)

Count the components that are **paths** (an isolated vertex counts as a path). A component is a path iff **E = V − 1** (it's a tree) **and every degree ≤ 2**. For each component (BFS), count its vertices, sum its degrees (Σdeg = 2E), and track the maximum degree.

### 5.5 Following functional connections on a grid (`da66_f2_grid_loop`)

Each cell holds a tile of type 1..6 connecting two of its four neighbours:

| Type | Connects |
|---|---|
| 1 | left – right |
| 2 | up – down |
| 3 | up – right |
| 4 | right – down |
| 5 | down – left |
| 6 | left – up |

Two cells are joined only if **both** tiles point at each other (mutual connection). Every cell has degree ≤ 2 in this graph, so every component is a path or a cycle. Visit each unvisited cell, walk its component in both directions, and decide whether it closes into a loop (every cell in it has 2 mutual connections). Count the loops and record the longest. That's O(R·C). The output is "count longest", or "0" if there are no loops (check the samples' format).

---

## 6. Complexity summary

| Task | Time |
|---|---|
| BFS / DFS | O(V + E), or O(R·C) on a grid |
| BFS from every vertex | O(V(V + E)) |
| components, cycle check, bipartiteness | O(V + E) |

---

## 7. Common traps

1. **Vertices 1-indexed in the input** but arrays 0-indexed.
2. Forgetting to **mark a vertex visited when you push it** (not when you pop it), which causes duplicate pushes and blow-ups.
3. Recursion depth on big graphs.
4. Not resetting the arrays between test cases.
5. Grid bounds checks, and confusing (r, c) with (x, y).
6. Memory for huge grids (5000²).
7. Directed vs undirected: add **both** directions for undirected edges.

---

## 8. Grader problems for this lesson

| Problem | Hint |
|---|---|
| `a65_q0_degrees` | row sums + counting, fast I/O |
| `d57_q1_dense` | bool matrix class, §3.1 |
| `d57_q1_sparse` | vector<set<int>> class, §3.1 |
| `a60a_q3_component` | count DFS/BFS starts, §5.1 |
| `da68_f_k_connected_city` | the first K vertices of a BFS, §4.4 |
| `ex05m1_cycle` | DFS with parent / DSU, reset per test, §5.2 |
| `a59_q3_cycle` | peel the degree-1 vertices, §5.3 |
| `a62_q2a_line_graph` | E = V − 1 and max deg ≤ 2 per component, §5.4 |
| `ex05m2_connection` | BFS limited to K from every vertex, §4.1 |
| `a62_q2a_pandemic` | multi-source BFS with dist ≤ T, §4.2 |
| `da67_f_border_extend` | multi-source BFS from land with dist ≤ k, §4.2 |
| `da66_f1_sea_bridge` | multi-source BFS from country 1 to country 2, memory, §4.2 |
| `da66_f2_grid_loop` | mutual tile connections, walk the components, §5.5 |

---

## 9. Exercises

1. Run BFS by hand from vertex 0 on the edges {0-1, 0-2, 1-3, 2-3, 3-4}. Give dist[].
2. Why does BFS give shortest paths only for unweighted graphs?
3. A graph has 10 vertices, 3 components and no cycles. How many edges does it have?
4. In `a59_q3_cycle`, which vertices remain after peeling for the edges {1-2, 2-3, 3-1, 3-4, 4-5}?

### Answers

1. dist = [0, 1, 1, 2, 3].
2. BFS counts edges. With weights, a path with more edges can be cheaper, so you need Dijkstra.
3. A forest with c components has V − c edges: 10 − 3 = 7.
4. 5 is a leaf, so remove it; then 4 becomes a leaf, so remove it. What remains is {1, 2, 3}, a cycle of length 3.
