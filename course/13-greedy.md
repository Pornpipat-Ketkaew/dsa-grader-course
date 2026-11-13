# Lesson 13: Greedy Algorithms

> **Goal:** build a solution by repeatedly making the locally best choice, and, most importantly, **prove** that this choice never hurts (with an exchange argument), so you know when greedy is right and when you need DP.

---

## 1. Why it matters

Problems: `ex04e1_interval`, `a58_m_p4`, `ex04e2_fknapsack`, `a60b_mid_p1_buffet`, `da67_m2_dungeon`, `da68_f_game_of_trades`, `ex04m1_sort` (Lesson 09), `da68_f_internet_provider` (MST, Lesson 18).

Dijkstra, Prim and Kruskal are all greedy algorithms (Lessons 17 and 18).

---

## 2. Theory

### 2.1 When is greedy correct?

Two properties are needed:

1. **Greedy-choice property:** some optimal solution contains the greedy first choice.
2. **Optimal substructure:** after making that choice, what remains is a smaller instance of the same problem.

### 2.2 How to prove it: the exchange argument

Take *any* optimal solution OPT. If it doesn't contain the greedy choice g, **swap** some element of OPT for g, and show that the result is still feasible and no worse. Then an optimal solution containing g exists. Repeat by induction.

### 2.3 How to disprove it: a counterexample

Always test your greedy idea on small cases. For example, 0/1 knapsack with "highest value per weight first": W = 10 and items (w 6, v 7), (w 5, v 5), (w 5, v 5). Greedy takes 6 → 7 and stops, but the optimum is 5 + 5 → 10. **0/1 knapsack needs DP** (Lesson 14). Only the *fractional* version is greedy.

---

## 3. Classic greedy problems

### 3.1 Interval scheduling: the maximum number of non-overlapping intervals (`ex04e1_interval`, `a58_m_p4`)

**Greedy:** sort by **finish time**, then take an interval whenever its start is ≥ the finish time of the last interval taken.

```cpp
vector<pair<int,int>> v(n);                 // (finish, start)
for (int i = 0; i < n; i++) cin >> v[i].second;
for (int i = 0; i < n; i++) cin >> v[i].first;
sort(v.begin(), v.end());
int cnt = 0; long long lastEnd = LLONG_MIN;
for (auto [f, s] : v)
    if (s >= lastEnd) { cnt++; lastEnd = f; }
```

**Proof (exchange):** let g be the interval that finishes first. In any optimal schedule, replace its first interval with g. That is still feasible, since g ends no later and so conflicts with nothing that comes after. The count is unchanged.

Note the boundary: classes may touch (S[a] ≥ F[b] is allowed), so the test is `>=`. In the second sample, [1,2], [2,3], [3,4], [4,5] gives 4.

Why "sort by start" or "shortest first" fails: one long interval that starts first can block many short ones, and a short interval can overlap two compatible ones.

### 3.2 Fractional knapsack (`ex04e2_fknapsack`)

Sort the items by **value per unit weight**, descending. Take whole items while they fit, then a fraction of the next one.

```cpp
sort(items by v/w desc);
double cap = W, ans = 0;
for (auto &it : items) {
    if (cap <= 0) break;
    double take = min(cap, it.w);
    ans += take * it.v / it.w;
    cap -= take;
}
printf("%.4f\n", ans);
```

Proof: any solution that takes weight from a lower-ratio item while a higher-ratio item isn't full can shift that weight to the better item and gain.

### 3.3 Covering points with intervals of fixed length (`a60b_mid_p1_buffet`)

The task: food sits at certain positions, and a lamp at x lights [x − w, x + w]. Find the minimum number of lamps.

**Greedy:** sort the food positions. Take the leftmost uncovered food at p, put a lamp at **p + w** (as far right as possible while still covering p), and skip every food ≤ p + 2w. Repeat.

Proof: some lamp must cover p. Any such lamp sits at ≤ p + w, so moving it to p + w covers everything it covered to the right of p and more. (The positions to the left of p are already covered.) Check the statement about lamps beyond the table edge (if they must be within 1..n, clamp to `min(p + w, n)`).

### 3.4 Scheduling with consumable resources (`da67_m2_dungeon`)

You must defeat the bosses **in order**. Each boss needs a set of item types. Dungeon d costs tᵈ power and gives one item of type zᵈ, and each dungeon can be explored once. Starting with power T, how many bosses can you defeat?

**Greedy:** for each needed item, always take the **cheapest unused** dungeon of that type. Keep a min-heap (or a sorted list with a pointer) per item type. For each boss in order, pop the cheapest dungeon for every required item, subtract the costs, and stop at the first boss where power would go negative or a type runs out.

Why: the bosses come in a fixed order, so the only freedom is *which* dungeon provides each item. Using a cheaper dungeon now never hurts later. (Exchange: if OPT uses a more expensive one now and the cheap one later, swap them. The totals match, and every prefix sum is ≤.)

### 3.5 Choosing the best trades under a global limit (`da68_f_game_of_trades`)

You may buy at most K units in total. Buying item j from NPC i costs X[i][j] (stock Z[i][j]), and the unit can be sold to any *other* NPC i' at Y[i'][j].

1. For each item j, the best selling price for a unit bought from i is max over i' ≠ i of Y[i'][j]. Precompute the **best and second-best** Y for each item (with the NPC index), so that "the best excluding i" is O(1).
2. Unit profit p(i, j) = bestSell(j, excluding i) − X[i][j]. Only positive profits matter.
3. Now every (i, j) offers Z[i][j] identical units of profit p. Sort the offers by p descending and take units greedily until K are taken. (This is like fractional knapsack with integer units of equal "weight" 1.)

Use `long long`: K, the counts and the prices can make the totals large.

### 3.6 Other greedy patterns to recognise

* **Activity selection variants:** the minimum number of rooms = the maximum overlap (sweep line).
* **Minimise the sum of waiting times:** serve the shortest job first.
* **Huffman coding:** repeatedly merge the two smallest, using a min-heap.
* **Coin change** with "canonical" coins (1, 2, 5, 10, …): greedy works; with arbitrary coins, DP.

---

## 4. Complexity

Usually dominated by sorting: O(n log n). With heaps: O(n log n).

---

## 5. Common traps

1. Using greedy where DP is required (0/1 knapsack, `da68_f2_sackknap`).
2. The wrong sort key (start instead of finish).
3. Boundary `>` vs `>=` for touching intervals.
4. Printing floating-point numbers: use `printf("%.4f")` or `cout << fixed << setprecision(4)`.
5. Overflow in profit sums.

---

## 6. Grader problems for this lesson

| Problem | Hint |
|---|---|
| `ex04e1_interval` / `a58_m_p4` | sort by finish, §3.1 |
| `ex04e2_fknapsack` | ratio v/w, §3.2 |
| `a60b_mid_p1_buffet` | lamp at the first uncovered position + w, §3.3 |
| `da67_m2_dungeon` | a min-heap per item type, process the bosses in order, §3.4 |
| `da68_f_game_of_trades` | best/second-best sell price, positive offers sorted, §3.5 |

---

## 7. Exercises

1. Give a counterexample to "pick the shortest interval first" for interval scheduling.
2. Food at 1, 2, 6, 7, 8, 15 with w = 1. How many lamps does greedy use, and where?
3. Prove that serving jobs shortest-first minimises the total completion time.

### Answers

1. [1,5], [4,7], [6,10]. Shortest first picks [4,7] (length 3), which conflicts with both others, giving 1. The optimum is [1,5] + [6,10] = 2.
2. A lamp at 2 covers 1–3 (the food at 1 and 2). A lamp at 7 covers 6–8. A lamp at 16 covers 15 (clamp to the table length if required). **3 lamps.**
3. If a longer job a comes right before a shorter job b, swapping them reduces b's completion time by len(a) and increases a's by len(b) < len(a), so the total decreases. Hence the optimum is sorted by length.
