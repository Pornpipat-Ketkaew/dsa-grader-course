# Lesson 15: Dynamic Programming II (Designing States, Counting mod p, Grid DP, Bitmask DP)

> **Goal:** when a problem has a *local constraint* ("no two adjacent 1s", "can't use the same door twice in a row", "1 and 2 must be at least 3 apart"), learn to put exactly the information you need into the DP **state** so that the constraint can be checked locally.

---

## 1. Why it matters

Problems: `a64_q2_table_no_11`, `da67_f_one_two_apart`, `da66_f2_new_game_plus`, `da67_f_travelling_tourist` (bitmask DP over the must-visit stations), and `da68_f2_zero_one_subset_sum` (counting).

These are typical **final exam** problems: count objects with constraints, answer mod 100 000 007.

---

## 2. The key idea: "what do I need to remember about the past?"

When you build the object left to right (column by column, cell by cell), ask:

> *To decide whether the next piece is allowed, what is the minimum information about what came before?*

That information **is the state**. Everything else can be forgotten.

| Constraint | What to remember |
|---|---|
| no two adjacent equal / adjacent 1s | the last column (or element) |
| something must be at distance ≥ 3 | the last **two** elements |
| can't repeat the last move | the last move |
| visit a set of special nodes | the **set** already visited (a bitmask) + the current node |
| total sum S | the current sum |

The number of states × transitions must fit the time limit.

---

## 3. Example 1: a 2 × n table with no adjacent 1s (`a64_q2_table_no_11`, n ≤ 10⁷)

Each column is one of `00`, `01` and `10` (top/bottom; `11` is forbidden because the two cells of a column are adjacent). Two neighbouring columns conflict if they have a 1 in the same row.

State: `dp[i][s]` = the number of valid tables of i columns whose last column is s ∈ {00, 01, 10}.

```
dp[i][00] = dp[i-1][00] + dp[i-1][01] + dp[i-1][10]
dp[i][01] = dp[i-1][00] + dp[i-1][10]
dp[i][10] = dp[i-1][00] + dp[i-1][01]
dp[1][*]  = 1
answer    = dp[n][00] + dp[n][01] + dp[n][10]   (mod 100000007)
```

Check: n = 1 → 3, n = 2 → 3 + 2 + 2 = 7 ✓, n = 3 → 17 ✓.

n = 10⁷ with 3 states per column is 3·10⁷ operations, fine. Keep just the previous column (3 variables), because a 10⁷ × 3 `long long` array takes 240 MB.

(Algebra shows a(n) = 2a(n−1) + a(n−2), but **the state method finds it for you**, and the problem forbids hard-coding answers anyway.)

---

## 4. Example 2: arrays of 0/1/2 where 1 and 2 are at least 3 apart (`da67_f_one_two_apart`, n ≤ 10⁶)

The constraint involves the elements at distance 1 and 2, so the state is the **last two values** (a, b), which gives 9 states. A new value c is allowed if neither {a, c} nor {b, c} is {1, 2}.

```cpp
const long long MOD = 100000007;
// dp[a][b] = number of valid arrays of the current length ending with ..., a, b
long long dp[3][3] = {}, nd[3][3];
auto bad = [](int x, int y){ return (x == 1 && y == 2) || (x == 2 && y == 1); };
if (n == 1) { cout << 3; return 0; }
for (int a = 0; a < 3; a++) for (int b = 0; b < 3; b++) dp[a][b] = !bad(a, b);
for (int len = 3; len <= n; len++) {
    memset(nd, 0, sizeof nd);
    for (int a = 0; a < 3; a++) for (int b = 0; b < 3; b++) if (dp[a][b])
        for (int c = 0; c < 3; c++)
            if (!bad(b, c) && !bad(a, c)) nd[b][c] = (nd[b][c] + dp[a][b]) % MOD;
    memcpy(dp, nd, sizeof dp);
}
long long ans = 0; for (auto &r : dp) for (long long x : r) ans = (ans + x) % MOD;
```

Verified against the samples: n = 1 → 3, n = 3 → 15, n = 15 → 198799, n = 214 → 89208675. That's O(27n).

---

## 5. Example 3: grid paths that can't repeat the last door (`da66_f2_new_game_plus`)

Start in any non-blocked room of column 1, and finish in any non-blocked room of column C. The doors are X (up-right), Y (right) and Z (down-right). You **can't use the same door twice in a row**, and blocked rooms can't be entered. Count the paths mod 100000007.

Every move goes to column c+1, so we process the grid **column by column**. State: `dp[r][c][d]` = the number of ways to reach room (r, c) where the last door used was d (plus a special "start" value meaning no door yet).

```
start: dp[r][1][NONE] = 1 for every open room r in column 1
transition from (r, c, last) with door d != last:
    d = X → (r-1, c+1);  d = Y → (r, c+1);  d = Z → (r+1, c+1)
    if the target is inside the grid and open: dp[target][d] += dp[r][c][last]
answer = Σ_r Σ_d dp[r][C][d]   (and if C == 1, every open room in column 1 counts once)
```

The number of states is R·C·4, and each has 3 transitions. Keep only two columns if memory is tight.

---

## 6. Bitmask DP: travelling through a set (`da67_f_travelling_tourist`)

There are k ≤ 8 must-visit stations in a weighted graph (n ≤ 500). You start at any of them and must visit them all with the minimum total distance (as a path, not a cycle; read the statement).

1. **Shortest distances between the stations:** run Dijkstra from each of the k stations (Lesson 17), and build the k × k matrix D.
2. **Bitmask DP (Held-Karp):** `best[mask][v]` = the minimum cost of a path that has visited exactly the stations in `mask`, ending at station v.

```cpp
const long long INF = LLONG_MAX / 4;
vector<vector<long long>> best(1 << k, vector<long long>(k, INF));
for (int v = 0; v < k; v++) best[1 << v][v] = 0;            // start anywhere
for (int mask = 1; mask < (1 << k); mask++)
    for (int v = 0; v < k; v++) if ((mask >> v & 1) && best[mask][v] < INF)
        for (int u = 0; u < k; u++) if (!(mask >> u & 1))
            best[mask | 1 << u][u] = min(best[mask | 1 << u][u], best[mask][v] + D[v][u]);
long long ans = INF;
for (int v = 0; v < k; v++) ans = min(ans, best[(1 << k) - 1][v]);
```

O(2ᵏ·k²) = 256·64. With k ≤ 8, trying all k! = 40320 permutations also works, and is simpler.

**Bitmask basics:**

| Operation | Code |
|---|---|
| is bit v set? | `(mask >> v) & 1` |
| set bit v | `mask \| (1 << v)` |
| clear bit v | `mask & ~(1 << v)` |
| number of set bits | `__builtin_popcount(mask)` |
| all subsets of n items | `for (int m = 0; m < (1 << n); m++)` |

---

## 7. A checklist for counting DP mod p

1. Define the state so that the constraint is **local**.
2. Write the transitions and check them on tiny n *by hand*, or with a brute-force program (as I did above for one_two_apart).
3. Reduce `% MOD` after every addition, and use `long long`.
4. Roll the arrays if n is large.
5. Handle the edge cases n = 1 and n = 0.

---

## 8. Common traps

1. A state that is missing information (for example, remembering only the last value when the constraint reaches distance 2).
2. Forgetting the blocked cells as *start* or *end* rooms.
3. Counting a path twice because of the "NONE" state.
4. Overflow in an intermediate sum before `% MOD`.
5. Hard-coding answers (forbidden explicitly in `a64_q2_table_no_11`).

---

## 9. Grader problems for this lesson

| Problem | State |
|---|---|
| `a64_q2_table_no_11` | the last column ∈ {00, 01, 10} |
| `da67_f_one_two_apart` | the last two values (9 states) |
| `da66_f2_new_game_plus` | (row, column, last door) |
| `da67_f_travelling_tourist` | (visited mask, current station) after Dijkstra |
| `da68_f2_zero_one_subset_sum` | (ones processed, sum) |

---

## 10. Exercises

1. Count the binary strings of length n with no two consecutive 1s. Give the states and compute n = 5.
2. Count the strings over {A, B, C} of length n with no "AA" and no "BB".
3. What is the state for "the number of paths in a grid moving right or down, where you may not move down three times in a row"?
4. How large is the bitmask DP table for k = 15? Is that OK?

### Answers

1. The state is the last bit (0 or 1). dp0' = dp0 + dp1, dp1' = dp0. Starting from n = 1: (1, 1) → (2, 1) → (3, 2) → (5, 3) → (8, 5). For n = 5 the total is **13** (the Fibonacci numbers).
2. The state is the last letter: A' = B + C, B' = A + C, C' = A + B + C.
3. (r, c, the number of consecutive downs at the end ∈ {0, 1, 2}).
4. 2¹⁵ × 15 ≈ 4.9·10⁵ states with 15 transitions each ≈ 7·10⁶ operations. Fine.
