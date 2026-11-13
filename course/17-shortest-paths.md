# Lesson 17: Graphs II (Shortest Paths: Dijkstra, Bellman-Ford, Floyd-Warshall)

> **Goal:** choose and implement the right shortest-path algorithm for every situation: non-negative weights, negative weights or cycles, all pairs, node weights, dense graphs, and graphs that grow over time.

---

## 1. Why it matters

Problems: `ex06e3_columbia`, `a58_q3_p3a_hacking`, `a61_q2_farthest`, `da66_f1_buffet_flight`, `ex06e2_shortest`, `ex06m2_exchange`, `a65_q3a_expressway`, `da67_f_travelling_tourist`.

---

## 2. Which algorithm?

| Situation | Algorithm | Time |
|---|---|---|
| unweighted | BFS (Lesson 16) | O(V + E) |
| weights ≥ 0, sparse | **Dijkstra with a heap** | O((V + E) log V) |
| weights ≥ 0, dense (E ≈ V²), V ≤ ~5000 | **Dijkstra O(V²)** with no heap | O(V²) |
| negative weights, single source, need negative-cycle detection | **Bellman-Ford** | O(VE) |
| all pairs, V ≤ ~500 | **Floyd-Warshall** | O(V³) |

---

## 3. Relaxation: the common core

`dist[v]` is an upper bound on the true distance. **Relaxing** an edge (u → v, w):

```cpp
if (dist[u] + w < dist[v]) dist[v] = dist[u] + w;
```

Every algorithm here is "relax edges in a clever order until nothing changes".

---

## 4. Dijkstra

### 4.1 Idea (greedy)

Keep a set of **finalised** vertices. Repeatedly take the non-finalised vertex with the smallest `dist`, finalise it, and relax its outgoing edges.

**Why it's correct (non-negative weights only):** when u has the smallest tentative distance, any other path to u would have to leave the finalised set through some vertex x with dist[x] ≥ dist[u], and then use only non-negative edges, so it can't be shorter. With a negative edge this argument breaks.

### 4.2 Heap implementation (sparse graphs)

```cpp
typedef long long ll;
vector<vector<pair<int,ll>>> g(n);              // g[u] = {(v, w)}
vector<ll> dist(n, LLONG_MAX);
priority_queue<pair<ll,int>, vector<pair<ll,int>>, greater<pair<ll,int>>> pq;
dist[s] = 0; pq.push({0, s});
while (!pq.empty()) {
    auto [d, u] = pq.top(); pq.pop();
    if (d != dist[u]) continue;                 // stale entry ("lazy deletion")
    for (auto [v, w] : g[u])
        if (d + w < dist[v]) { dist[v] = d + w; pq.push({dist[v], v}); }
}
```

### 4.3 O(V²) implementation (dense graphs: adjacency matrices, complete graphs)

```cpp
vector<ll> dist(n, INF); vector<bool> done(n, false);
dist[s] = 0;
for (int it = 0; it < n; it++) {
    int u = -1;
    for (int v = 0; v < n; v++) if (!done[v] && (u == -1 || dist[v] < dist[u])) u = v;
    if (dist[u] == INF) break;                  // the rest is unreachable
    done[u] = true;
    for (int v = 0; v < n; v++) if (w[u][v] valid) dist[v] = min(dist[v], dist[u] + w[u][v]);
}
```

With V = 1000–2000 this is 10⁶–4·10⁶ steps, *faster* than a heap with V² edges.

### 4.4 Variants in this folder

* **Vertex weights, grid** (`ex06e3_columbia`): entering cell v costs fee[v], and the start is free. Run Dijkstra on the grid graph where edge (u → v) weighs fee[v]. Set `dist[start] = 0`. R·C ≤ 2·10⁵, so use the heap.
* **Vertex weights, multi-source** (`a58_q3_p3a_hacking`): the virus hacks k servers immediately. Server i takes c[i] seconds to hack, and an infected server attacks its neighbours. Hacking time: `dist[s] = c[s]` for every initial server s, and `dist[v] = min(dist[u] + c[v])`. Push all sources first (multi-source Dijkstra). **The output is a single number, the maximum of dist[]** (the statement's "n lines" sentence is a copy-paste error, and the samples show one number). Also read **m** cable lines, not n−1.
* **Dense directed matrix** (`a61_q2_farthest`): the answer is the max over v of dist(1, v), or −1 if some city is unreachable. Use the O(V²) Dijkstra. Check how "no edge" is encoded in the matrix.
* **Costs split into "take-off" and "landing"** (`da66_f1_buffet_flight`): flying a → b costs co[a] + ci[b]. That's still just an edge weight, w(a, b) = co[a] + ci[b], on the given directed flights. Use Dijkstra from 0 and print −1 for unreachable airports.
* **Distances between special vertices** (`da67_f_travelling_tourist`): run Dijkstra from each of the k ≤ 8 special stations, then a bitmask DP or permutations over them (Lesson 15 §6).

---

## 5. Bellman-Ford (negative weights)

### 5.1 Algorithm

Relax **every** edge, V − 1 times. A shortest simple path has at most V − 1 edges, and after round i, every shortest path with ≤ i edges is correct.

```cpp
vector<ll> dist(n, INF); dist[s] = 0;
for (int i = 0; i < n - 1; i++)
    for (auto [a, b, c] : edges)
        if (dist[a] != INF && dist[a] + c < dist[b]) dist[b] = dist[a] + c;
// negative cycle check: if any edge can still be relaxed, a negative cycle is reachable from s
bool neg = false;
for (auto [a, b, c] : edges)
    if (dist[a] != INF && dist[a] + c < dist[b]) neg = true;
```

O(VE). For `ex06e2_shortest` (N ≤ 100), print −1 if there's a negative cycle, otherwise the distances. Check what the statement wants for unreachable vertices. (The `dist[a] != INF` guard prevents INF − 5 from looking like an improvement.)

### 5.2 Currency arbitrage (`ex06m2_exchange`)

The question: is there a cycle whose product of rates is > 1? Take logs: Π R > 1 ⇔ Σ log R > 0 ⇔ Σ (−log R) < 0, which is a **negative cycle** in a graph with weights −log R[a][b].

* Run Bellman-Ford from a virtual source connected to every vertex with weight 0 (or initialise dist = 0 for every vertex). If a relaxation still happens in round V, answer YES.
* N ≤ 500 with a complete graph means E = 250 000, so V·E = 1.25·10⁸ per table. That's heavy but simple. Stop early when a round changes nothing.
* **Floyd alternative:** compute the best product `P[i][j] = max_k P[i][k] · P[k][j]` (O(N³)), and answer YES if some P[i][i] > 1 + ε.
* Floating point: compare with a small epsilon (1e-9) to avoid false positives from rounding.

---

## 6. Floyd-Warshall (all pairs)

```cpp
// d[i][j] = the edge weight, INF if there is none, 0 on the diagonal
for (int k = 0; k < n; k++)
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            if (d[i][k] + d[k][j] < d[i][j]) d[i][j] = d[i][k] + d[k][j];
```

**Meaning:** after iteration k, d[i][j] = the shortest path using only the intermediate vertices {0..k}. That's a DP over the allowed intermediate vertices. **k must be the outer loop.** A negative cycle exists iff some d[i][i] < 0.

### 6.1 Incremental Floyd: adding a vertex (`a65_q3a_expressway`)

Each year i, province i is added with edges to some earlier provinces, and you print the shortest 1 → 2 distance. Recomputing from scratch every year is O(n⁴) or O(n·n² log n), which is too slow for n = 700. Instead, when vertex i arrives with edges c[i][a]:

1. **Distances from and to i:** `d[i][x] = min over neighbours a of (c[i][a] + d[a][x])`, for every old x. That is O(deg·n) ≤ O(n²). (The graph is undirected, so d[x][i] = d[i][x].)
2. **Paths through i:** for all old x, y: `d[x][y] = min(d[x][y], d[x][i] + d[i][y])`, which is O(n²).
3. Print d[1][2].

The total is O(n³) ≈ 3.4·10⁸ simple operations over all years, which passes in 1 s with tight loops (`int`/`long long` arrays, not maps). Running the O(n²) dense Dijkstra from 1 every year costs the same and is also acceptable.

---

## 7. Reconstructing the path (bonus)

Store `parent[v] = u` whenever you relax (u → v), then walk back from the target.

---

## 8. Common traps

1. **Dijkstra with negative edges** gives wrong answers. Use Bellman-Ford.
2. **INF + w overflow.** Use `LLONG_MAX/4`, or check for INF before adding.
3. **Forgetting the stale-entry check** (`if (d != dist[u]) continue;`), which can make Dijkstra much slower.
4. Using `int` for distances on big graphs (10⁴ vertices × 10⁹ weights).
5. Floyd with k in the inner loop.
6. Reading the input in the wrong format: matrix row/column direction ("R[i][j] is the i-th number on the j-th line" in `ex06m2_exchange`!), 0- vs 1-indexing, and the number of edge lines.

---

## 9. Grader problems for this lesson

| Problem | Algorithm |
|---|---|
| `ex06e3_columbia` | heap Dijkstra on a grid with vertex fees |
| `a58_q3_p3a_hacking` | multi-source Dijkstra, vertex weights, print the max |
| `a61_q2_farthest` | O(V²) Dijkstra on a matrix, max or −1 |
| `da66_f1_buffet_flight` | Dijkstra with w = co[a] + ci[b] |
| `ex06e2_shortest` | Bellman-Ford + negative-cycle check |
| `ex06m2_exchange` | negative cycle on −log R (Bellman-Ford or Floyd) |
| `a65_q3a_expressway` | incremental Floyd |
| `da67_f_travelling_tourist` | k Dijkstras + bitmask DP |

---

## 10. Exercises

1. Run Dijkstra by hand on: 0→1 (4), 0→2 (1), 2→1 (2), 1→3 (1), 2→3 (5). Give dist[].
2. Construct a 3-vertex graph with one negative edge where Dijkstra fails.
3. Why does Bellman-Ford need exactly V − 1 rounds?
4. In Floyd, why must k be the outer loop?

### Answers

1. dist = [0, 3, 1, 4].
2. 0→1 (2), 0→2 (3), 2→1 (−2). Dijkstra finalises 1 with distance 2, but 0→2→1 = 1.
3. A shortest path without cycles has at most V − 1 edges, and round i fixes every path with i edges.
4. The DP invariant ("only intermediates ≤ k are used") requires every pair to be updated with k before k+1 is allowed.
