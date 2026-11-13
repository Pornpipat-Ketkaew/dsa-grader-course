# Lesson 14: Dynamic Programming I (Memoisation, Tables and the Classic Problems)

> **Goal:** turn an exponential recursion into a polynomial algorithm by **storing answers to sub-problems**, and master the classic DP problems: Fibonacci, binomials, the number triangle, LCS, LPS, knapsack, and counting sequences.

---

## 1. Why it matters

Problems: `ex02e1_fibo`, `ex02e2_cnk`, `ex02m1_triangle`, `ex03e1_lcs`, `da68_f_hidden_palindrome`, `da68_f2_sackknap`, `a62_q1b_chocolate`, `da66_f1_linear_recurrence`, `ex07e2_iss`, `da68_f2_zero_one_subset_sum`.

DP is the most powerful general technique in the course. Lesson 15 continues with designing *states*.

---

## 2. Theory

### 2.1 When DP applies

1. **Optimal substructure:** the answer to the problem is built from answers to sub-problems.
2. **Overlapping sub-problems:** the naive recursion solves the *same* sub-problem many times.

Example: `fib(n) = fib(n−1) + fib(n−2)` calls `fib(n−2)` twice, `fib(n−3)` three times, …, which gives exponential time O(φⁿ). There are only n+1 distinct sub-problems, though.

### 2.2 The two styles

**Top-down (memoisation):** write the recursion, and cache the results.

```cpp
long long memo[50]; bool done[50];
long long fib(int n) {
    if (n <= 1) return n;
    if (done[n]) return memo[n];
    done[n] = true;
    return memo[n] = fib(n - 1) + fib(n - 2);
}
```

**Bottom-up (tabulation):** fill a table in an order where every dependency is already computed.

```cpp
long long f[50]; f[0] = 0; f[1] = 1;
for (int i = 2; i <= n; i++) f[i] = f[i-1] + f[i-2];
```

Both are O(n). Bottom-up avoids deep recursion and lets you **roll arrays** (keep only the last row) to save memory.

### 2.3 The 5-step recipe for designing a DP

1. **Define the state** in words: "`dp[i][j]` = the best/number of … using the first i items and capacity j". *This is the hard part. Write it down.*
2. **Recurrence:** how does `dp[state]` depend on smaller states? Think about the **last decision**.
3. **Base cases.**
4. **Order of computation**, so that dependencies come first.
5. **Answer location**: `dp[n][W]`? The max over the last row?

Complexity = (number of states) × (work per state).

---

## 3. Classic problems

### 3.1 Binomial coefficient C(n, k) (`ex02e2_cnk`)

Pascal's rule: C(n, k) = C(n−1, k−1) + C(n−1, k), with C(n, 0) = C(n, n) = 1. Last decision: is element n in the subset or not?

```cpp
long long C[31][31];
for (int i = 0; i <= 30; i++) {
    C[i][0] = C[i][i] = 1;
    for (int j = 1; j < i; j++) C[i][j] = C[i-1][j-1] + C[i-1][j];
}
```

C(30, 15) ≈ 1.55·10⁸ fits in `int`, but use `long long` anyway. If the problem requires a recursive solution, memoise it.

### 3.2 Number triangle (`ex02m1_triangle`)

State: `dp[r][c]` = the maximum sum of a path from (r, c) down to the bottom.
Recurrence: `dp[r][c] = a[r][c] + max(dp[r+1][c], dp[r+1][c+1])`. Fill from the bottom row upward. The answer is `dp[0][0]`. O(N²).

(Top-down greedy, always moving to the larger child, is **wrong**: a small number now can lead to a huge number later.)

### 3.3 Longest common subsequence (`ex03e1_lcs`)

A subsequence keeps the order but may skip characters. The state is `L[i][j]` = the LCS length of the prefixes `a[0..i)` and `b[0..j)`:

```
L[i][j] = 0                              if i == 0 or j == 0
        = L[i-1][j-1] + 1                if a[i-1] == b[j-1]
        = max(L[i-1][j], L[i][j-1])      otherwise
```

Why: look at the last characters. If they match, using them is never worse. Otherwise at least one of them isn't in the LCS, so drop it.

```cpp
vector<vector<int>> L(n + 1, vector<int>(m + 1, 0));
for (int i = 1; i <= n; i++)
    for (int j = 1; j <= m; j++)
        L[i][j] = (a[i-1] == b[j-1]) ? L[i-1][j-1] + 1 : max(L[i-1][j], L[i][j-1]);
```

O(nm) time. Two rows are enough if you only need the length.

### 3.4 Longest palindromic subsequence (`da68_f_hidden_palindrome`, N ≤ 3000)

**Method 1:** LPS(s) = LCS(s, reverse(s)). That's O(N²) = 9·10⁶, which is fine. Use rolling rows: a 3001 × 3001 `int` table is 36 MB, which may be OK too, but check the memory limit.

**Method 2 (interval DP):** `P[i][j]` = the LPS of s[i..j].

```
P[i][i] = 1
P[i][j] = P[i+1][j-1] + 2              if s[i] == s[j]       (P of an empty range = 0)
        = max(P[i+1][j], P[i][j-1])    otherwise
```

Fill by increasing length, or with i going downward. This is your first **interval DP**: the state is a sub-range [i, j].

### 3.5 0/1 knapsack and its variants

**Classic:** maximise the value with total weight ≤ W, where each item can be used at most once.

State: `dp[w]` = the best value with capacity w, using the items processed so far.

```cpp
vector<long long> dp(W + 1, 0);
for (int i = 0; i < n; i++)
    for (int w = W; w >= wt[i]; w--)            // DOWNWARD, so each item is used at most once
        dp[w] = max(dp[w], dp[w - wt[i]] + val[i]);
```

**Why downward?** `dp[w - wt[i]]` must still be the value *before* item i was considered. Going upward would let item i be reused (that is the *unbounded* knapsack).

The complexity is O(nW). This is "pseudo-polynomial": fine for n, W ≤ 10⁴ (10⁸ simple operations, which is tight but OK with a 1D array).

**SackKnap variant** (`da68_f2_sackknap`): **minimise** the price with total weight **exactly** V.

* `dp[0] = 0` and `dp[v] = INF` for v > 0 ("unreachable").
* `dp[v] = min(dp[v], dp[v - w_i] + p_i)`, iterating v downward.
* The answer is `dp[V]`, or −1 if it is still INF.
* The prices go up to 10⁹ and n up to 10⁴, so sums reach 10¹³: **`long long`**, with INF = 4·10¹⁸ or `LLONG_MAX/2`.

The "exact" vs "at most" difference lives only in the **initialisation**: INF everywhere except dp[0] means only exact sums are reachable.

### 3.6 Counting compositions (`a62_q1b_chocolate`)

The task: count the ordered ways to write n as a sum of parts from S (the order matters, since [1,2] ≠ [2,1]). The answer is taken modulo the number in the statement.

State: `dp[i]` = the number of ways to eat exactly i pieces. Last decision: the size s of the last day's portion.

```
dp[0] = 1
dp[i] = Σ_{s in S, s <= i} dp[i - s]    (mod M)
```

O(n·|S|).

**Compositions vs partitions:** with the *order counted* (compositions), loop over the sum outside and the parts inside, as above. With *order ignored* (partitions, `ex07e2_iss`), loop over the **parts outside**, so each multiset is counted once:

```cpp
// number of partitions of N (nondecreasing sequences): coin-change counting
vector<long long> ways(N + 1, 0); ways[0] = 1;
for (int part = 1; part <= N; part++)
    for (int s = part; s <= N; s++) ways[s] += ways[s - part];
// ways[10] = 42 ✓
```

### 3.7 Linear recurrences (`da66_f1_linear_recurrence`)

R(n) = c₁R(n−1) + … + c_k R(n−k) for n ≥ k, and R(i) = aᵢ for i < k, all mod 32717. With k, n ≤ 1000, just fill an array: O(nk) = 10⁶.

```cpp
vector<long long> R(max(n + 1, k));
for (int i = 0; i < k; i++) R[i] = a[i] % MOD;
for (int i = k; i <= n; i++) {
    long long s = 0;
    for (int j = 1; j <= k; j++) s = (s + c[j] * R[i - j]) % MOD;
    R[i] = s;
}
```

(For huge n, use matrix power, Lesson 12.)

### 3.8 Counting with a bounded value per position (`da68_f2_zero_one_subset_sum`)

Let m be the number of 1s (≤ 15). Each becomes a value in [1, K]. Count the assignments with total S.

`dp[j][s]` = the number of ways for the first j ones to sum to s: `dp[j][s] = Σ_{v=1..K, v ≤ s} dp[j−1][s−v]`. The answer is `dp[m][S]`, in O(m·S·K). Positions with 0 don't matter. (If there are no ones, the answer is 1 when S = 0, else 0.)

---

## 4. Memory tricks

* **Rolling arrays:** if row i depends only on row i−1, keep 2 rows (or 1 row with the right loop direction, as in knapsack).
* **Use the smallest type** that fits (`int` vs `long long`, `short`).
* `vector<vector<int>>` of 3001 × 3001 is about 36 MB. A 10⁴ × 10⁴ `int` table is 400 MB, which is too much: roll it.

---

## 5. Common traps

1. **The wrong loop direction in 0/1 knapsack** (upward means unlimited reuse).
2. **Uninitialised INF** for min-DP, and adding to INF overflows: check `dp[v-w] != INF` before adding.
3. **Forgetting `% MOD`** inside the sum.
4. **Off-by-one** between the "first i items" state and 0-based arrays.
5. **Recursion without memo**, which gives TLE.
6. **Greedy instead of DP** (triangle, 0/1 knapsack).

---

## 6. Grader problems for this lesson

| Problem | State | Hint |
|---|---|---|
| `ex02e1_fibo` | f[i] | §2.2 |
| `ex02e2_cnk` | C[n][k] | §3.1 |
| `ex02m1_triangle` | dp[r][c] | §3.2, bottom-up |
| `da66_f1_linear_recurrence` | R[i] | §3.7 |
| `a62_q1b_chocolate` | dp[i] | §3.6 compositions |
| `ex07e2_iss` | ways[s] | §3.6 partitions |
| `ex03e1_lcs` | L[i][j] | §3.3 |
| `da68_f_hidden_palindrome` | P[i][j] or LCS with the reverse | §3.4 |
| `da68_f2_zero_one_subset_sum` | dp[j][s] | §3.8 |
| `da68_f2_sackknap` | dp[v] = min price | §3.5 exact + min + long long |

---

## 7. Exercises

1. Fill the LCS table for a = "ABCB" and b = "BDCAB". What is the length?
2. Knapsack, W = 5, items (w 2, v 3), (w 3, v 4), (w 4, v 5). Fill dp[0..5].
3. With S = {1, 2}, how many compositions does n = 4 have? Which famous sequence is this?
4. What is wrong with iterating `w` upward in 0/1 knapsack? Give an example.
5. Compute the LPS of "BBABCBCAB".

### Answers

1. LCS = 3 (for example "BCB").
2. After item 1: [0,0,3,3,3,3]. After item 2: [0,0,3,4,4,7]. After item 3: [0,0,3,4,5,7]. The answer is 7.
3. 5 (1111, 112, 121, 211, 22). The Fibonacci numbers.
4. With one item (w 1, v 1) and W = 3, upward iteration gives dp[3] = 3, using the item three times.
5. 7 ("BABCBAB").
