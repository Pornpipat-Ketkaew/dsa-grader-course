# Lesson 10: Sweep Line, Intervals, Two Pointers and Kadane

> **Goal:** process events in sorted order instead of simulating every coordinate; merge intervals; expand or shrink windows with two pointers; find the maximum subarray in O(n).

---

## 1. Why it matters

Problems: `da66_m1_line_monopoly`, `da68_m2_interesting_events`, `d57_q3_zuma`, `a60b_q1_diagsum`. The same ideas appear inside greedy interval problems (Lesson 13).

Typical warning sign: **coordinates up to 10⁹ but only n ≤ 2·10⁵ intervals.** You can't make an array over the coordinates, but you *can* sort the 2n endpoints.

---

## 2. Sweep line

### 2.1 Idea

Turn every interval [l, r] (inclusive) into two **events**: +1 at l and −1 at r + 1. Sort the events by coordinate and scan from left to right, maintaining `active` = the number of intervals covering the current point. Between two consecutive event coordinates, `active` is constant.

```cpp
vector<pair<long long,int>> ev;            // (coordinate, +1/-1)
for (auto [l, r] : intervals) { ev.push_back({l, +1}); ev.push_back({r + 1, -1}); }
sort(ev.begin(), ev.end());
int active = 0;
for (size_t i = 0; i < ev.size(); ) {
    long long x = ev[i].first;
    while (i < ev.size() && ev[i].first == x) active += ev[i++].second;   // apply all events at x
    // for coordinates in [x, nextX) the coverage is `active`
}
```

### 2.2 Answering "is point x covered by ≥ k intervals?" (`da68_m2_interesting_events`)

1. Sweep once and build the list of maximal segments [a, b] where `active ≥ k`. They come out sorted and disjoint.
2. For each query x, binary search for the last segment with a ≤ x, and check x ≤ b.

Total: O((n + q) log n). The off-by-one detail is that "+1 at l, −1 at r+1" handles inclusive days correctly.

### 2.3 Online interval union (`da66_m1_line_monopoly`)

Intervals arrive one at a time, and after each one (or at query time) you must report the **number of disjoint merged blocks**. Intervals that *touch* (r + 1 == l') merge too, so check the statement's rule.

Keep a `std::map<long long,long long> seg` from start to end of the disjoint blocks, and a counter.

```cpp
void add(long long l, long long r) {
    auto it = seg.upper_bound(l);               // the first block starting after l
    if (it != seg.begin()) {
        auto pv = prev(it);
        if (pv->second + 1 >= l) {              // the previous block overlaps or touches
            l = pv->first;
            r = max(r, pv->second);
            it = seg.erase(pv);                 // the next element
            count--;
        }
    }
    while (it != seg.end() && it->first <= r + 1) {   // swallow every following block that overlaps or touches
        r = max(r, it->second);
        it = seg.erase(it);
        count--;
    }
    seg[l] = r; count++;
}
```

Each block is inserted once and erased at most once, so the **amortized cost is O(log n)** per operation.

### 2.4 Difference arrays (when coordinates are small)

If the coordinates are ≤ 10⁷, use `diff[l]++, diff[r+1]--` and then a prefix sum. This is the same idea without sorting.

---

## 3. Two pointers

### 3.1 Expanding from a centre (`d57_q3_zuma`)

A string of beads (N ≤ 10⁶). Insert a bead of colour V at position K. If the run of equal colours **touching the insertion point** has length ≥ 3, it explodes, the two sides join, and if the run at the *junction* now has length ≥ 3 it explodes too, and so on.

You don't need to rebuild the array after every explosion. Use two pointers `L` and `R` that mark the exploded region [L, R]:

1. Conceptually insert V. Expand L to the left and R to the right while the colour equals V. If the run length is < 3, stop: nothing explodes.
2. Otherwise the run [L, R] disappears. The new junction is between L−1 and R+1. If those two beads have the **same colour c**, expand outward over colour c from both sides. If the combined length is ≥ 3, extend [L, R] and repeat. Otherwise stop.
3. Print everything outside [L, R].

Each bead is passed by a pointer at most once, so the time is **O(N)**. Use fast I/O for 10⁶ numbers. Check the samples: `7 2 4 / 1 1 4 4 4 1 1` becomes empty (both colours explode), while in `10 5 4` the final `5 5 5` stays because it isn't at the junction.

### 3.2 Sliding window (general pattern)

To find the longest subarray with sum ≤ S (all values ≥ 0):

```cpp
int best = 0; long long sum = 0;
for (int l = 0, r = 0; r < n; r++) {
    sum += a[r];
    while (sum > S) sum -= a[l++];       // shrink until valid again
    best = max(best, r - l + 1);
}
```

Each index enters and leaves the window once, so this is O(n). It works because the condition is **monotone in the window size**.

---

## 4. Kadane's algorithm: the maximum subarray sum

**Question:** the maximum sum of a non-empty contiguous subarray.

**DP view:** let `best_end[i]` = the max sum of a subarray *ending at i*. It either extends the previous one or starts fresh:

```
best_end[i] = max(a[i], best_end[i-1] + a[i])
answer      = max over i of best_end[i]
```

```cpp
long long cur = a[0], ans = a[0];
for (int i = 1; i < n; i++) {
    cur = max(a[i], cur + a[i]);
    ans = max(ans, cur);
}
```

This is O(n) and O(1) memory. It handles all-negative arrays correctly (the answer is the largest single element), and that's why we initialise with a[0] and not 0.

### 4.1 On every diagonal (`a60b_q1_diagsum`)

A diagonal segment is A[i+p][j+p] for p = 0..k−1. Every diagonal of the n × n matrix (there are 2n − 1 of them, each with a fixed difference c − r) is just a 1-D array. Run Kadane on each. The total is O(n²) = 10⁶. Check the example: the answer 10 comes from (2,1) with length 2, which is 3 + 7.

```cpp
for (int d = -(n-1); d <= n-1; d++) {             // d = c - r
    int r = max(0, -d), c = r + d;
    long long cur = LLONG_MIN / 2, best = LLONG_MIN;
    for (; r < n && c < n; r++, c++) {
        cur = max((long long)A[r][c], cur + A[r][c]);
        best = max(best, cur);
    }
    ans = max(ans, best);
}
```

---

## 5. Common traps

1. **Inclusive vs exclusive endpoints**: "booth open on days l..r inclusive" means the −1 event goes at r+1.
2. **Order of simultaneous events**: process every event at the same coordinate before reading `active`.
3. **Touching intervals**: does [1,3] + [4,6] form one block? Read the statement. In Line Monopoly they merge (the cells are integers).
4. **Kadane initialisation** with all-negative data.
5. Using `int` for sums of 10⁶ values up to 10⁹: use `long long`.

---

## 6. Grader problems for this lesson

| Problem | Hint |
|---|---|
| `a60b_q1_diagsum` | Kadane on each diagonal, §4.1 |
| `da68_m2_interesting_events` | sweep → segments with coverage ≥ k → binary search the queries, §2.2 |
| `da66_m1_line_monopoly` | map of disjoint blocks + a counter, §2.3 |
| `d57_q3_zuma` | expand from the insertion point with two pointers, §3.1 |

---

## 7. Exercises

1. Intervals [1,4], [2,6], [8,9], k = 2. Which integer points have coverage ≥ 2?
2. Run Kadane on [−2, 1, −3, 4, −1, 2, 1, −5, 4].
3. Insert [5,7] into the blocks {[1,3], [8,10]} with touching blocks merging. How many blocks are left?
4. Why is the sliding window wrong for "longest subarray with sum ≤ S" when negative numbers are allowed?

### Answers

1. Points 2..4 (covered by the first two intervals).
2. 6, from [4, −1, 2, 1].
3. [5,7] touches [8,10] (7 + 1 = 8) but not [1,3] (3 + 1 = 4 < 5), so the blocks are {[1,3], [5,10]}: **2** blocks.
4. Shrinking the window may *increase* the sum when a removed element is negative, so the monotonicity fails.
