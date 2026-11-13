# Lesson 12: Divide and Conquer

> **Goal:** split a problem into independent sub-problems of the same kind, solve them recursively, and combine the results. Analyse the cost with recurrences.

---

## 1. Why it matters

Problems: `a60_q1_matmod`, `a62_q1a_recur`, `a62_q1b_virus`, `a63_q1b_virus2`, `ds04_best_bst` (median-first insertion), plus merge sort and binary search (Lessons 08 and 09). Fast matrix power also solves linear recurrences (`da66_f1_linear_recurrence`, `a64_q2_table_no_11`) when n is huge.

---

## 2. The pattern

```
solve(problem):
    if problem is small: solve directly                     (base case)
    split into sub-problems P1..Pa, each of size n/b         (divide)
    S_i = solve(P_i)                                         (conquer)
    return combine(S_1..S_a)                                 (combine)
```

The cost is T(n) = a·T(n/b) + cost(divide + combine). Solve it with the master theorem (Lesson 01 §2.3).

**When it applies:** the problem has a *recursive definition* ("a virus of size 2ᵏ is made of two viruses of size 2ᵏ⁻¹", "H(a,b) is built from four H(a−1,·)"), or you can split the input and the answers combine cheaply.

---

## 3. Fast exponentiation (exponentiation by squaring)

### 3.1 Numbers

xⁿ = (x^(n/2))² if n is even, and x · xⁿ⁻¹ if n is odd. So T(n) = T(n/2) + O(1) = O(log n).

```cpp
long long power(long long x, long long n, long long mod) {
    long long r = 1 % mod;
    x %= mod;
    while (n > 0) {
        if (n & 1) r = r * x % mod;
        x = x * x % mod;
        n >>= 1;
    }
    return r;
}
```

### 3.2 2×2 matrices (`a60_q1_matmod`)

Exactly the same, with matrix multiplication mod k. Since n ≤ 2³⁰, this takes 30 squarings. The entries are < k ≤ 10⁴, so a product of two entries < 10⁸ and a sum of two products < 2·10⁸ fits in `int`, but `long long` is safer.

```cpp
typedef array<long long,4> M;            // {a, b, c, d} = [[a, b], [c, d]]
M mul(const M& X, const M& Y, long long k) {
    return { (X[0]*Y[0] + X[1]*Y[2]) % k, (X[0]*Y[1] + X[1]*Y[3]) % k,
             (X[2]*Y[0] + X[3]*Y[2]) % k, (X[2]*Y[1] + X[3]*Y[3]) % k };
}
M mpow(M A, long long n, long long k) {
    M R = {1 % k, 0, 0, 1 % k};          // identity (careful when k == 1)
    while (n) { if (n & 1) R = mul(R, A, k); A = mul(A, A, k); n >>= 1; }
    return R;
}
```

Check: A = [[1,2],[3,4]], n = 2, k = 1000 gives [[7,10],[15,22]] ✓ (the sample).

**Why it matters later:** a linear recurrence like a(n) = 2a(n−1) + a(n−2) can be written as `[a(n), a(n−1)]ᵀ = [[2,1],[1,0]] · [a(n−1), a(n−2)]ᵀ`, so a(n) needs a matrix power: O(log n) instead of O(n). In this folder n ≤ 10⁷ is small enough for O(n), but remember the trick.

---

## 4. Building a recursive structure (`a62_q1a_recur`)

The definition: H(0, b) = [b] (1×1), and

```
H(a, b) = | H(a-1, b)     H(a-1, b-1) |
          | H(a-1, b+1)   H(a-1, b)   |
```

The size is 2ᵃ × 2ᵃ, with a ≤ 8, so at most 256 × 256.

Write a function that **fills a region** of a global table:

```cpp
vector<vector<int>> v;
void recur(int a, int b, int top, int left) {        // fills a 2^a x 2^a block
    if (a == 0) { v[top][left] = b; return; }
    int h = 1 << (a - 1);
    recur(a - 1, b,     top,     left);              // top-left
    recur(a - 1, b - 1, top,     left + h);          // top-right
    recur(a - 1, b + 1, top + h, left);              // bottom-left
    recur(a - 1, b,     top + h, left + h);          // bottom-right
}
// main: v.assign(1 << a, vector<int>(1 << a)); recur(a, b, 0, 0); print
```

Work: T(N) = 4T(N/2) + O(1) over N = 2ᵃ, which is O(N²), the size of the output. That's optimal.

Check against the sample: H(1, 0) = [[0, −1], [1, 0]] ✓.

---

## 5. Recognising recursively defined strings

### 5.1 `a62_q1b_virus`: the virus with an optional reversal

The definition: size 2¹ is exactly "01". A virus of size 2ᵏ is a + b, where **b is a valid virus of size 2ᵏ⁻¹** and **a is a valid virus or the reverse of one**.

A checker follows straight from the definition:

```
valid(s):                      // |s| is a power of two
    if |s| == 2: return s == "01"
    L = left half, R = right half
    return valid(R) && ( valid(L) || valid(reverse(L)) )
```

Cost: T(n) = 3T(n/2) + O(n) in the worst case, roughly O(n^1.58). With n = 2ᵏ and small k (see the limits), that's fine. You can speed it up by noticing that "valid or reversed-valid" can be checked with one function `ok(l, r, reversed)` that reads indices in either direction, so you never copy strings.

### 5.2 `a63_q1b_virus2`: the balanced-ones virus

The definition: any 2-character string is valid. Size 2ᵏ is valid iff both halves are valid **and** |ones(L) − ones(R)| ≤ 1.

```
valid(l, r):                   // the half-open segment [l, r)
    if r - l == 2: return true
    m = (l + r) / 2
    if |ones(l, m) - ones(m, r)| > 1: return false
    return valid(l, m) && valid(m, r)
```

With a **prefix sum** of ones, `ones(l, r)` is O(1), so T(n) = 2T(n/2) + O(1) = O(n). Without a prefix sum it's O(n log n), which also passes for k ≤ 10 (n ≤ 1024).

---

## 6. Merge sort and counting inversions (recap)

See Lesson 09 §2.2. This is the most important D&C algorithm, and it teaches the "combine step does the real work" idea.

## 7. Other classic D&C examples (good to know)

* **Maximum subarray by D&C:** best = max(left best, right best, the best sum crossing the middle). That is O(n log n). Kadane is better, but this is a classic exam question.
* **Closest pair of points:** O(n log n).
* **Karatsuba multiplication:** T(n) = 3T(n/2) + O(n).
* **Quickselect:** O(n) on average.

---

## 8. Common traps

1. **Copying sub-arrays at every level.** Pass indices (l, r) instead.
2. **Wrong base case** (size 1 vs size 2).
3. **Mixing up the quadrant order** in the matrix construction. Test with the given samples (H(1,0) and H(2,1)).
4. **`mod 1`**: the identity matrix should be all zeros when k = 1, hence `1 % k`.
5. **Overflow in matrix multiplication** with larger moduli. Use `long long`.

---

## 9. Grader problems for this lesson

| Problem | Hint |
|---|---|
| `a60_q1_matmod` | §3.2 |
| `a62_q1a_recur` | §4, fill quadrants recursively |
| `a63_q1b_virus2` | §5.2 + prefix sums |
| `a62_q1b_virus` | §5.1, check the reversed variant by index direction |
| `ds04_best_bst` | insert medians recursively (Lesson 07 §5.5) |

---

## 10. Exercises

1. Compute 3¹³ mod 7 by repeated squaring, showing each step.
2. Solve T(n) = 4T(n/2) + 1 and T(n) = 2T(n/2) + n.
3. Is "1001" a valid virus in `a62_q1b_virus`? Is "0110"?
4. Write the recurrence for the matrix power that computes Fibonacci numbers.

### Answers

1. 13 = 1101₂. Powers of 3 mod 7: 3¹ = 3, 3² = 2, 3⁴ = 4, 3⁸ = 2. Then 3¹³ = 3⁸ · 3⁴ · 3¹ = 2·4·3 = 24 ≡ **3**.
2. Θ(n²); Θ(n log n).
3. "1001": the right half "01" is valid, and the left half "10" is the reverse of "01", so yes. "0110": the right half "10" is not valid, so no.
4. [[F(n+1), F(n)], [F(n), F(n−1)]] = [[1,1],[1,0]]ⁿ.
