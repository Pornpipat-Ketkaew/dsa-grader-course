# Lesson 08: Binary Search and Prefix Sums

> **Goal:** (1) write a bug-free binary search for any "first/last position where a condition holds" question; (2) recognise **binary search on the answer**; (3) use **prefix sums** to answer range-sum questions in O(1).

---

## 1. Why it matters

Binary search: `ex01e3`, `ex02e3_bs`, `ex01m3`, `d63_q1a_hiatus`, `d63_q1b_interval_count`, `a65_q2a_huge_array`, `da67_m_chocolate_truffle`, `da68_m_count_value`, `da68_m2_interesting_events`.
Prefix sums: `d65_q1c_ice_cream`, `a64_q1_lawn_mowing`, `a63_q1b_virus2`, `a65_q2a_huge_array`.

Whenever you see "**n, q ≤ 2·10⁵** and each query asks about a sorted or monotone thing", think binary search.

---

## 2. Binary search on a sorted array

### 2.1 The one template to remember: "first index where `ok(i)` is true"

If `ok` is **monotone** (false, false, …, false, true, true, …, true) over [lo, hi), then:

```cpp
// returns the smallest i in [lo, hi) with ok(i) true, or hi if there is none
int first_true(int lo, int hi) {
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;   // avoids overflow of lo+hi
        if (ok(mid)) hi = mid;          // the answer is mid or to its left
        else         lo = mid + 1;      // the answer is to the right of mid
    }
    return lo;
}
```

**Why it terminates and is correct:**

* Invariant: the answer always lies in [lo, hi].
* `mid < hi` always holds, so each step strictly shrinks the interval.

Everything else is a special case:

| Question (sorted array A of size n) | `ok(i)` | Result |
|---|---|---|
| first index with A[i] ≥ x (`lower_bound`) | A[i] >= x | i |
| first index with A[i] > x (`upper_bound`) | A[i] > x | i |
| **last** index with A[i] ≤ x (`ex02e3_bs`) | A[i] > x | i − 1 (−1 if none) |
| largest value ≤ x (`ex01e3`) | A[i] > x | A[i−1] if i > 0, else −1 |
| how many elements lie in [L, R] | | upper_bound(R) − lower_bound(L) |

### 2.2 `ex01e3` forbids `std::lower_bound`. Write it yourself

```cpp
// A sorted ascending, distinct. Largest element <= x, or -1 if none.
long long floor_of(const vector<long long>& A, long long x) {
    int lo = 0, hi = A.size();
    while (lo < hi) {
        int mid = (lo + hi) / 2;
        if (A[mid] > x) hi = mid; else lo = mid + 1;
    }
    return lo == 0 ? -1 : A[lo - 1];
}
```

(Note: `ex01e3`'s queries may be real numbers. Read them as `double` if the statement says so, or compare carefully.)

### 2.3 Binary search with STL

```cpp
auto it = lower_bound(v.begin(), v.end(), x);   // first >= x
int idx = it - v.begin();
auto jt = upper_bound(v.begin(), v.end(), x);   // first > x
// on a set or map, use the member function: s.lower_bound(x)   (O(log n); std::lower_bound on a set is O(n))
```

### 2.4 Encoding a 2-D key as one number

`d63_q1a_hiatus` works with (year, month) pairs. Encode `key = year * 12 + (month - 1)`. That makes them integers in time order, so "the latest publication before the query" becomes "the largest key < query key", which is a binary search on the sorted keys (then decode `year = key / 12`, `month = key % 12 + 1`). Pairs in a sorted vector work too.

`da67_m_chocolate_truffle` does the same on a grid visited row by row: cell (p, q) gets the number `(p−1)·C + (q−1)` (a `long long`, since R·C can reach 10¹⁸). Sort the favourite cells' numbers. For a query cell, `lower_bound` finds the next favourite, **wrapping around** to the first one (plus R·C) if there isn't one after it.

---

## 3. Binary search on the answer

### 3.1 The idea

If the question is "find the smallest t such that `feasible(t)` holds", and feasibility is **monotone** (when t works, every t' > t works), binary search over t, even when t is huge (10¹⁸), as long as you can test `feasible(t)` quickly.

Total complexity = O(log(range) × cost of feasible).

### 3.2 Worked example: `ex01m3` Restaurant

*N chefs, where chef i takes Tᵢ minutes per customer. Customers are seated as soon as any seat is free. At what time is customer c seated (c ≤ 10¹²)?*

**Key observation:** by time t (inclusive), chef i has started ⌊t / Tᵢ⌋ + 1 customers (at times 0, Tᵢ, 2Tᵢ, …). So

```
seated(t) = Σ_i ( t / T_i + 1 )          // nondecreasing in t
answer    = the smallest t with seated(t) >= c
```

`seated` is monotone, so binary search t in [0, c · min T]:

```cpp
long long lo = 0, hi = c * minT;              // at time c*minT, chef min alone seated > c
while (lo < hi) {
    long long mid = (lo + hi) / 2;
    long long cnt = 0;
    for (int i = 0; i < N; i++) { cnt += mid / T[i] + 1; if (cnt >= c) break; }  // early stop avoids overflow
    if (cnt >= c) hi = mid; else lo = mid + 1;
}
// lo is the answer
```

Each query is O(N log(c·T)) ≈ 1000 × 50, fine for 200 queries. Check it against the sample (T = 2 2 5): c = 4 → t = 2 (5 customers seated by t = 2), and c = 6 → t = 4.

### 3.3 Recognising "binary search on the answer"

Look for these phrases: *"minimum time such that"*, *"maximum length such that the cost ≤ budget"*, *"the smallest k for which it's possible"*, and huge answer ranges with small n.

---

## 4. Prefix sums

### 4.1 One dimension

```cpp
// P[0] = 0, P[i] = A[0] + ... + A[i-1]
vector<long long> P(n + 1, 0);
for (int i = 0; i < n; i++) P[i + 1] = P[i] + A[i];
// sum of A[l..r] (inclusive) = P[r + 1] - P[l]      in O(1)
```

If every A[i] ≥ 0, then P is **nondecreasing**, so you can binary search on P.

### 4.2 Worked example: `a64_q1_lawn_mowing`

*Query (l, budget): choose r ≥ l to maximise the grass Σ A[l..r], subject to Σ A[l..r] + (r − l + 1)·k ≤ budget.*

* Define B[i] = A[i] + k (the cost of cell i). Its prefix sum PB is strictly increasing because A[i] ≥ 0 and k > 0.
* The cost of [l, r] is PB[r+1] − PB[l] ≤ budget ⇔ PB[r+1] ≤ PB[l] + budget.
* Find the largest r with this property by `upper_bound` on PB, then output PA[r+1] − PA[l] (grass only). If even r = l is too expensive, the answer is 0.

Each query is O(log n), so the total is O((n + m) log n).

### 4.3 Expanded arrays without expanding (`a65_q2a_huge_array`)

The array consists of N runs (Xᵢ repeated Cᵢ times), with a total length up to 2·10⁹, which is far too big to build. After sorting the runs by X, position P (1-indexed) lies in the first run whose cumulative count is ≥ P. So take prefix sums of C (as `long long`), and `lower_bound(P)` gives the run. Each query is O(log N).

### 4.4 Piecewise-constant growth (`d65_q1c_ice_cream`)

Savings change rate on certain days, so precompute the cumulative savings S[d] for every day d up to the maximum (10⁵). S is increasing, which makes questions such as "the first day when the total reaches P" a `lower_bound` on S. When the money is lost on day X, the new question is "the first day d > X with S[d] − S[X] ≥ P", which is `lower_bound(S[X] + P)` searching after X. Read the statement for exactly what happens on day X itself.

### 4.5 Two dimensions (bonus)

```cpp
// P[i][j] = sum of a[0..i-1][0..j-1]
P[i+1][j+1] = a[i][j] + P[i][j+1] + P[i+1][j] - P[i][j];
// rectangle sum (r1..r2, c1..c2) = P[r2+1][c2+1] - P[r1][c2+1] - P[r2+1][c1] + P[r1][c1]
```

### 4.6 Prefix counts (`a63_q1b_virus2`)

"Number of 1s in a segment" = a prefix sum of the 0/1 array. Combine this with divide & conquer (Lesson 12).

---

## 5. Common traps

1. `mid = (lo + hi) / 2` overflows when lo + hi > 2³¹. Use `long long` or `lo + (hi − lo)/2`.
2. An infinite loop when you write `lo = mid` instead of `lo = mid + 1`.
3. A wrong upper bound in binary search on the answer: make sure `feasible(hi)` is true.
4. Overflow *inside* `feasible` (summing counts up to 10¹²·1000). Stop early once the count ≥ c.
5. Off-by-one between 0- and 1-indexed positions (P[i] is the "1-indexed P-th element" in `huge_array`).
6. Calling `std::lower_bound` on a `std::set` is O(n). Use `s.lower_bound(x)`.

---

## 6. Grader problems for this lesson

| Problem | Hint |
|---|---|
| `ex02e3_bs` | last index with A[i] ≤ x (duplicates allowed), else −1: §2.1 |
| `ex01e3` | largest value ≤ x, written manually: §2.2 |
| `d63_q1b_interval_count` | sort, then count in [p − k, p + k] with lower/upper_bound |
| `da68_m_count_value` | values of a map → sort → count in [A, B] |
| `d63_q1a_hiatus` | encode y·12 + m; exact match → "0 0"; else the predecessor; none → "-1 -1" |
| `ex01m3` | binary search on time, §3.2 |
| `a65_q2a_huge_array` | sort runs + prefix counts + lower_bound, §4.3 |
| `a64_q1_lawn_mowing` | prefix sums of A[i] + k + upper_bound, §4.2 |
| `d65_q1c_ice_cream` | cumulative-savings array + lower_bound, §4.4 |
| `da67_m_chocolate_truffle` | linearise cells (long long), lower_bound with wrap-around, §2.4 |

---

## 7. Exercises

1. A = [1, 3, 3, 3, 7, 9]. Give lower_bound(3), upper_bound(3), lower_bound(4) and upper_bound(10) as indices.
2. Using `first_true`, find the integer square root of x ≤ 10¹⁸ (the largest r with r² ≤ x).
3. A = [2, 1, 5, 0, 4]. Build P and compute the sum of A[1..3].
4. Why does binary search on the answer require monotonicity?

### Answers

1. 1, 4, 4, 6.
2. Search the first r in [0, 2·10⁹] with r·r > x (use `__int128` or check `r > x / r`); the answer is that r − 1.
3. P = [0, 2, 3, 8, 8, 12], so the sum is P[4] − P[1] = 8 − 2 = 6.
4. Each probe discards half of the range, and that is only valid if a "true" at mid means everything to the right is also true.
