# Lesson 11: Recursion, Exhaustive Search and Backtracking

> **Goal:** be able to *generate every candidate solution* systematically (strings, subsets, permutations, paths, assignments), *in the required order*, and *prune* branches that cannot lead to a solution.

---

## 1. Why it matters

Problems: `ex00e4`, `ex00e5`, `ex07e1_nqueen`, `ex07e2_iss`, `ex07e3_coloring`, `a64_q1_permu_before`, `a64_q4_path_sum`, `a65_q1_tower_defense`, `da66_f1_map_walk`, `da67_f_abc_permutation`, `da68_f_abcd_permutation`, `da68_f2_zero_one_subset_sum`.

**When to use it:** whenever the problem says "print **all** …", or n is tiny (≤ 10–20).

---

## 2. Recursion fundamentals

A recursive function has:

1. a **base case** that stops,
2. a **recursive case** that reduces the problem to smaller instances,
3. a **trust** principle: assume the recursive call works, and only check that your combination step is right. (This is the induction principle.)

```cpp
long long fact(int n) { return n <= 1 ? 1 : n * fact(n - 1); }
```

---

## 3. The backtracking template

Think of building a solution **one decision at a time**: position 0, then position 1, and so on. At each step, try every allowed choice, recurse, then **undo** the choice.

```cpp
void solve(int step /*, state */) {
    if (step == N) {                  // a complete candidate
        if (valid()) output();        // or count++
        return;
    }
    for (each choice c allowed at this step) {
        if (!promising(c)) continue;  // PRUNING: skip branches that can't work
        apply(c);                     // modify the state
        solve(step + 1);
        undo(c);                      // restore the state (the "back" in backtracking)
    }
}
```

The **order in which you try choices** determines the **order of the output**. Trying '0' before '1', or 'A' before 'B', at every step produces **lexicographic order**. Many problems require exactly that (`ex00e5`, `abc_permutation`, `map_walk`, `permu_before`).

---

## 4. Standard generators

### 4.1 All binary strings of length n (2ⁿ)

```cpp
string s;
void gen(int n) {
    if ((int)s.size() == n) { cout << s << '\n'; return; }
    s.push_back('0'); gen(n); s.pop_back();
    s.push_back('1'); gen(n); s.pop_back();
}
```

The output is in increasing numeric order, which is what `ex00e5` (n-bit strings with ≥ k consecutive 1s) needs: generate all of them and print those that pass a check. Prune if you like, but 2²⁰ ≈ 10⁶ is already fine.

### 4.2 Binary strings with exactly A ones (combinations), for `ex00e4`

Prune with counts: only place a '1' if ones < A, and only place a '0' if zeros < B − A.

```cpp
void gen(int pos, int ones, int B, int A, string &s) {
    if (pos == B) { cout << s << '\n'; return; }
    if (B - pos - (A - ones) > 0) { s[pos] = '0'; gen(pos + 1, ones, B, A, s); }   // still room for a 0
    if (ones < A)                 { s[pos] = '1'; gen(pos + 1, ones + 1, B, A, s); }
}
```

The output size is C(B, A) lines. Pruning means we never generate invalid strings.

### 4.3 Strings with limited letters (`da67_f_abc_permutation`, `da68_f_abcd_permutation`)

The task: strings of length N using at most i A's, j B's and k C's (and D's), printed in lexicographic order **after the count**.

* Keep `remaining[letter]`, and try letters in order A, B, C, D.
* You must print the count *first*, so either store the strings in a vector, or run the recursion twice (once to count, once to print). Use fast output, because there can be many lines.

### 4.4 Permutations

```cpp
vector<int> perm; vector<bool> used;
void gen(int n) {
    if ((int)perm.size() == n) { print(perm); return; }
    for (int x = 0; x < n; x++) if (!used[x]) {      // trying x in increasing order gives lexicographic output
        used[x] = true; perm.push_back(x);
        gen(n);
        perm.pop_back(); used[x] = false;
    }
}
```

**With "a must come before b" constraints** (`a64_q1_permu_before`): when trying to place b, require that its required predecessor a is already used. This pruning makes the output exactly the valid permutations, still in lexicographic order. (Each b has at most one constraint according to the statement. Store `need[b] = a`, or −1.)

### 4.5 Integer partitions (`ex07e2_iss`)

The task: count nondecreasing sequences summing to N. Recursively, choose the next part ≥ the previous part:

```
count(remaining, minPart) = 1 if remaining == 0
                          = Σ_{p = minPart}^{remaining} count(remaining - p, p)
```

For N = 100 the plain recursion is slow (p(100) ≈ 1.9·10⁸ leaves). **Memoise** it on (remaining, minPart), giving a 101 × 101 table, or turn it into a DP (Lesson 14). This is the bridge from backtracking to DP. The sample gives 42 for N = 10.

---

## 5. Constraint search with pruning

### 5.1 N-Queens (`ex07e1_nqueen`, N ≤ 12)

Place one queen per row. A column c is allowed in row r if no earlier queen shares the column or a diagonal. Use three boolean arrays:

* `col[c]`
* `d1[r + c]` (the "/" diagonals, 0..2N−2)
* `d2[r - c + N - 1]` (the "\" diagonals)

```cpp
int N, cnt = 0;
vector<bool> col, d1, d2;
void place(int r) {
    if (r == N) { cnt++; return; }
    for (int c = 0; c < N; c++) {
        if (col[c] || d1[r + c] || d2[r - c + N - 1]) continue;
        col[c] = d1[r + c] = d2[r - c + N - 1] = true;
        place(r + 1);
        col[c] = d1[r + c] = d2[r - c + N - 1] = false;
    }
}
```

N = 12 has 14200 solutions, so this runs instantly. Each check is O(1) instead of scanning the board.

### 5.2 Graph colouring / chromatic number (`ex07e3_coloring`, N ≤ 50)

For k = 1, 2, 3, …, test whether the graph can be coloured with k colours, and output the first k that works.

* Colour vertices in order (or with the highest degree first). For vertex v, try colours 0..k−1 that no already-coloured neighbour uses.
* **Symmetry pruning:** never use colour c+1 before colour c has been used. Equivalently, allow at most `maxUsed + 1` as the colour of the next vertex. This removes k! equivalent colourings.
* Bound: the answer ≤ max degree + 1.

### 5.3 Assignment search (`a65_q1_tower_defense`)

There are k towers, each able to shoot one monster within distance w (or nothing), and m ≤ 8 monsters. The goal is to minimise the total remaining power, where power can't drop below 0. Backtrack over the towers: for each tower, try every monster in range (and "shoot none"), keeping the current hit counts. At the leaf, compute Σ max(0, hᵢ − hitsᵢ). Prune: shooting a monster whose power is already 0 is useless.

### 5.4 Paths in a grid (`da66_f1_map_walk`)

From (1,1) to (R,C) on a grid of at most 10 × 10, the moves are A = right, B = down, C = up. You can't revisit a cell, the walk stops when it reaches (R,C), and blocked cells can't be entered. Print **every** path in lexicographic order, then "DONE".

* DFS trying A, then B, then C, which gives lexicographic order automatically.
* `visited[r][c]` is set on entry and cleared on return.
* **Memory is 32 MB.** Print each path as you find it. Don't store them all.

### 5.5 All simple-path sums in a small graph (`a64_q4_path_sum`)

With n ≤ 20 vertices and m ≤ 200 edges, there are 8 queries "is there a simple path with total weight exactly K?" DFS from every start vertex over simple paths, marking each prefix sum as reachable (sums ≤ 20000). Then answer each query by lookup. Prune when the sum exceeds the largest query. The number of simple paths can be large, but these limits are designed so it passes.

### 5.6 Counting assignments (`da68_f2_zero_one_subset_sum`)

The task: a binary array of length N ≤ 15, where each 1 is replaced by a value in 1..K; count the assignments whose total is S ≤ 150. Backtracking over the ones with the pruning "the remaining ones can add at least `ones_left` and at most `ones_left × K`" works. A DP over (number of ones processed, sum) is cleaner: dp[i][s] = Σ_{v=1..K} dp[i−1][s−v] (Lesson 14).

---

## 6. Complexity of exhaustive search

| Search | Nodes |
|---|---|
| binary strings of length n | 2ⁿ |
| combinations C(n, k) | C(n, k) |
| permutations | n! (≈ 3.6·10⁶ for n = 10) |
| each of k items choosing among m options | mᵏ |

Pruning doesn't change the worst-case bound, but it often makes the real search tiny.

---

## 7. Common traps

1. **Forgetting to undo** a state change, which corrupts sibling branches.
2. **Wrong output order**: the loop order of choices must match the required ordering.
3. **Printing too slowly**: millions of lines need `'\n'` and fast I/O.
4. **Storing all solutions** when memory is tight (`map_walk`).
5. **Global state not reset** between test cases.
6. **Stopping the recursion too late**: check the end condition (reaching (R, C)) *before* trying more moves.

---

## 8. Grader problems for this lesson

| Problem | Hint |
|---|---|
| `ex00e4` | §4.2 |
| `ex00e5` | §4.1 + "has a run of k ones" check (k = 0 means print everything) |
| `ex07e1_nqueen` | §5.1 |
| `a64_q1_permu_before` | §4.4 with the predecessor constraint |
| `da67_f_abc_permutation` | §4.3, count first |
| `da68_f_abcd_permutation` | §4.3 with 4 letters |
| `da66_f1_map_walk` | §5.4 |
| `ex07e2_iss` | §4.5, memoise |
| `a65_q1_tower_defense` | §5.3 |
| `a64_q4_path_sum` | §5.5 |
| `da68_f2_zero_one_subset_sum` | §5.6 |
| `ex07e3_coloring` | §5.2 |

---

## 9. Exercises

1. How many lines does `ex00e4` print for A = 2, B = 5? List the first three in the order 0-before-1.
2. Write a recursive function that prints all subsets of {1..n} in lexicographic order of their sorted elements.
3. Modify the N-Queens code to print the first solution in lexicographic order of columns.
4. Why does the symmetry pruning in colouring not lose any valid answers?

### Answers

1. C(5,2) = 10 lines: 00011, 00101, 00110, …
2. `void sub(int start, vector<int>& cur) { print(cur); for (int x = start; x <= n; x++) { cur.push_back(x); sub(x + 1, cur); cur.pop_back(); } }`
3. Make `place` return bool; when r == N, print and return true; in the loop, `if (place(r + 1)) return true;`.
4. Any valid colouring can be relabelled so that colours appear in first-use order 0, 1, 2, …, and the search explores exactly those canonical colourings.
