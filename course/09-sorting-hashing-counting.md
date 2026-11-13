# Lesson 09: Sorting, Counting and Hashing

> **Goal:** know how the main sorting algorithms work and what they cost, recognise when sorting turns a hard problem into an easy one, and count things efficiently with arrays, maps and hash tables.

---

## 1. Why it matters

Problems: `ex04m1_sort`, `a66_q2a_insertion_count`, `d62_q1a_vote`, `d62_q1b_grandfather`, `d61_q1_ordered_set`, `a65_q0_degrees`, `d60_q1_v_uniq`, `da67_m_count_distinct`, `ex00e3`.

Sorting is also the first step of most greedy algorithms (Lesson 13), of sweep lines (Lesson 10), and of Kruskal (Lesson 18).

---

## 2. The sorting algorithms

| Algorithm | Time (worst) | Time (average) | Extra memory | Stable | Idea |
|---|---|---|---|---|---|
| Selection sort | O(n²) | O(n²) | O(1) | no | repeatedly pick the minimum |
| **Insertion sort** | O(n²) | O(n²), and O(n) if nearly sorted | O(1) | yes | insert each item into the sorted part |
| Bubble sort | O(n²) | O(n²) | O(1) | yes | swap adjacent pairs |
| **Merge sort** | O(n log n) | O(n log n) | O(n) | yes | divide in half, sort both halves, merge |
| **Quick sort** | O(n²) | O(n log n) | O(log n) | no | partition around a pivot |
| Heap sort | O(n log n) | O(n log n) | O(1) | no | build a heap, pop n times |
| Counting sort | O(n + K) | O(n + K) | O(K) | yes | values in [0, K) |
| `std::sort` | O(n log n) | O(n log n) | O(log n) | no | introsort (quick + heap + insertion) |

**Comparison-sort lower bound:** any sort that only compares elements needs Ω(n log n) comparisons in the worst case. (A decision tree must have n! leaves, and log₂(n!) ≈ n log n.)

### 2.1 Insertion sort and inversions (`a66_q2a_insertion_count`)

The version in the problem processes positions from right to left:

```cpp
for (int pos = A.size() - 2; pos >= 0; pos--) {
    T tmp = A[pos];
    size_t i = pos + 1;
    while (i < A.size() && A[i] < tmp) { A[i-1] = A[i]; i++; }   // line 07: A[i] shifts LEFT
    A[i-1] = tmp;
}
```

**Question:** how many times does value k get shifted at line 07?

**Reasoning:** when a value `tmp` is inserted (it comes from a position to the left of k's original position), k is shifted exactly when `k < tmp`, because the while loop moves every smaller element of the sorted suffix one step left. Each element to the **left** of k (with a smaller original index) is inserted exactly once, after k is already in the suffix. So

> shifts(k) = the number of indices j < index(k) with A[j] > k.

This is the number of **inversions** involving k as the right element. With m ≤ 1000 queries and n up to around 10⁵, a linear scan per query (O(n·m) = 10⁸ simple comparisons) is borderline but usually passes. A cleaner way precomputes the answer for every element with a Fenwick tree (BIT) in O(n log n):

```cpp
// count, for each position i, how many earlier elements are greater
// compress values to 1..n first
vector<int> bit(n + 1, 0);
auto add = [&](int i){ for (; i <= n; i += i & -i) bit[i]++; };
auto sum = [&](int i){ int s = 0; for (; i > 0; i -= i & -i) s += bit[i]; return s; };
for (int i = 0; i < n; i++) {
    greaterBefore[i] = i - sum(rank[i]);   // earlier elements whose rank is > rank[i]
    add(rank[i]);
}
```

The total number of inversions is also how many swaps bubble sort makes, and how much work insertion sort does.

### 2.2 Merge sort (know it by heart)

```cpp
void merge_sort(vector<int>& a, int l, int r, vector<int>& tmp) {   // sorts [l, r)
    if (r - l <= 1) return;
    int m = (l + r) / 2;
    merge_sort(a, l, m, tmp);
    merge_sort(a, m, r, tmp);
    int i = l, j = m, k = l;
    while (i < m && j < r) tmp[k++] = (a[j] < a[i]) ? a[j++] : a[i++];   // stable: take the left one on ties
    while (i < m) tmp[k++] = a[i++];
    while (j < r) tmp[k++] = a[j++];
    for (int t = l; t < r; t++) a[t] = tmp[t];
}
```

T(n) = 2T(n/2) + O(n) = O(n log n). When `a[j] < a[i]` during the merge, there are `m − i` inversions with a[j]. Adding them up counts all inversions in O(n log n).

### 2.3 Quick sort partition (Lomuto)

```cpp
int partition(vector<int>& a, int l, int r) {   // [l, r], pivot = a[r]
    int p = a[r], i = l;
    for (int j = l; j < r; j++) if (a[j] < p) swap(a[i++], a[j]);
    swap(a[i], a[r]);
    return i;                                   // the pivot's final place
}
```

**Quickselect** (`nth_element`) recurses only into the side containing the k-th element, giving O(n) on average.

### 2.4 Counting sort and counting arrays

When values are small (K ≤ 10⁷), count them in an array:

```cpp
vector<int> cnt(K, 0);
for (int x : a) cnt[x]++;
```

`a65_q0_degrees`: read the n × n adjacency matrix (n ≤ 5000, which is 25·10⁶ numbers, so use **fast I/O**!). Compute deg[i] = the sum of row i, then cnt[deg]++, and print cnt[0..maxdeg].

---

## 3. Sorting as a problem-solving tool

Many problems become easy once the data is sorted:

* **Distinct values:** sort + `unique`.
* **Duplicates / closest pair in 1-D:** sort, then compare neighbours.
* **"k-th largest distinct count"** (`d62_q1a_vote`): count the votes with `map<string,int>`, put the counts in a vector, sort it descending, and the answer is `counts[min(K, size) - 1]`. Everyone tied with that count is also elected, but that doesn't change the *number* printed.
* **Greedy order** (Lesson 13).
* **Sweep line** (Lesson 10).

### 3.1 Minimum swaps to sort 1/2/3 values (`ex04m1_sort`)

Let c1, c2 and c3 be the counts. In the sorted array, zone 1 is [0, c1), zone 2 is [c1, c1+c2), and zone 3 is the rest. Let w[a][b] = the number of positions in zone a holding value b.

* A swap can fix **two** misplaced elements when they are in each other's zones (a value 2 in zone 1 and a value 1 in zone 2). So first do `min(w[1][2], w[2][1])` swaps, and likewise for (1,3) and (2,3).
* What remains forms 3-cycles (1→2→3→1), each needing **2** swaps for 3 elements. The number of remaining misplaced elements is a multiple of 3, so add 2 × (remaining / 3).

```
answer = Σ_{a<b} min(w[a][b], w[b][a]) + 2 * (|w[1][2] - w[2][1]|)
```

(After the 2-cycles, |w[1][2] − w[2][1]| = |w[2][3] − w[3][2]| = |w[1][3] − w[3][1]| is the number of 3-cycles.) This is a classic exchange argument: you can't fix 3 elements with fewer than 2 swaps, and 2-cycles are the most efficient fixes.

---

## 4. Hashing and maps

| Need | Tool |
|---|---|
| keys are small integers (≤ 10⁷) | plain array / `vector<int>` |
| keys are large integers or strings, no order needed | `unordered_map` / `unordered_set` |
| keys need order, predecessor/successor, or range counts | `map` / `set` |

### 4.1 Parent pointers in a hash map (`d62_q1b_grandfather`)

10⁶ (father, son) pairs, with ids up to 10¹³ (so `long long`), and M queries "do A and B have the same grandfather?"

```cpp
unordered_map<long long,long long> fa; fa.reserve(2'000'000);
// for each pair: fa[son] = father;
auto gp = [&](long long x) -> long long {          // -1 if unknown
    auto it = fa.find(x);           if (it == fa.end()) return -1;
    auto jt = fa.find(it->second);  if (jt == fa.end()) return -1;
    return jt->second;
};
// answer: A != B && gp(A) != -1 && gp(A) == gp(B)
```

### 4.2 Set operations keeping order (`d61_q1_ordered_set`)

Union/intersection of two sequences of up to 10⁵ items, preserving the order the statement defines (usually the order of the first sequence, then the new items of the second):

```cpp
unordered_set<T> inB(B.begin(), B.end());
for (auto &x : A) if (inB.count(x)) result.push_back(x);       // intersection in A's order
```

That is O(n), whereas the naive nested loop is O(n²), which means TLE.

### 4.3 Keep-first-occurrence (`d60_q1_v_uniq`)

Walk left to right with a `std::set<T>` (or `unordered_set`) of values seen, and compact in place (Lesson 03, Pattern A). That is O(n log n).

---

## 5. Common traps

1. Sorting with a comparator that is not a *strict weak ordering* (for example `<=`). This is undefined behaviour and can crash `std::sort`. Always use strict `<`.
2. Reading 25·10⁶ numbers with slow I/O (`a65_q0_degrees`).
3. `map[x]` silently inserting keys.
4. Assuming `unordered_map` iteration is ordered.
5. Forgetting that equal keys lose their original order after `std::sort` (use `stable_sort` if order matters).

---

## 6. Grader problems for this lesson

| Problem | Hint |
|---|---|
| `ex00e3` | boolean seen-array of size N+1, range check, `long long` input |
| `a65_q0_degrees` | row sums → counting array, fast I/O |
| `d62_q1a_vote` | map counts → sort desc → index min(K, size)−1 |
| `d62_q1b_grandfather` | `unordered_map` parent, §4.1 |
| `d61_q1_ordered_set` | hash-set membership, §4.2 |
| `d60_q1_v_uniq` | seen-set + compaction (Lesson 03) |
| `da67_m_count_distinct` | copy + sort + count changes |
| `ex04m1_sort` | zone counting, §3.1 |
| `a66_q2a_insertion_count` | number of earlier elements greater than k, §2.1 |

---

## 7. Exercises

1. Sort [5, 2, 4, 6, 1, 3] with insertion sort (the left-to-right version) and count the element shifts.
2. How many inversions does [3, 1, 2] have? [4, 3, 2, 1]?
3. For `ex04m1_sort`, verify the sample `2 2 1 3 2 1 3` gives 3.
4. Why is quicksort O(n²) on sorted input when the pivot is always the last element?

### Answers

1. The number of shifts = the number of inversions = 9.
2. 2 (pairs (3,1) and (3,2)); 6 (every pair).
3. c1 = 2, c2 = 3, c3 = 2. Zone 1 (positions 0–1) holds 2, 2, so w[1][2] = 2. Zone 2 (positions 2–4) holds 1, 3, 2, so w[2][1] = 1 and w[2][3] = 1. Zone 3 (positions 5–6) holds 1, 3, so w[3][1] = 1. Pairs: min(w12, w21) = 1, min(w13, w31) = 0, min(w23, w32) = 0, so 1 swap. Remaining: w12 = 1, w23 = 1, w31 = 1, which is one 3-cycle needing 2 swaps. The total is **3** ✓.
4. Each partition splits off only the pivot, so the sizes are n, n−1, …, 1 and the total is O(n²).
