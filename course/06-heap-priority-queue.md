# Lesson 06: Binary Heaps and `CP::priority_queue`

> **Goal:** understand the heap property, the array layout of a complete binary tree, `fixUp`/`fixDown`, comparator semantics, and **index arithmetic on levels and subtrees**. These are the tools for every heap problem in this folder.

---

## 1. Why it matters

Problems: `ds03_heap_erase`, `d58_q2_custom`, `d63_q3a_rank_in_heap`, `d64_q3a_heap_kth`, `d62_q3a_heap_descendant`, `da66_m1_heap_before_node`, `da68_m_heap_child_swap`, `da68_m2_ordered_heap_reconstruction`.

Heaps also power **Dijkstra** (Lesson 17), greedy algorithms (`da67_m2_dungeon`, Lesson 13) and "k largest" queries.

---

## 2. Theory

### 2.1 Priority queue: the abstract data type

The operations are `push(x)`, `top()` (the highest-priority element) and `pop()`. We want O(log n) for push and pop, and O(1) for top.

### 2.2 Binary heap = complete binary tree + heap order

* **Shape:** a *complete* binary tree. Every level is full except possibly the last, which is filled from the left. Because of this, it can be stored in an array with **no pointers**.
* **Order (max-heap):** every node has priority ≥ each of its children. So the root is the maximum.

Array layout, with the root at index 0:

```
             i
          /     \
      2i+1      2i+2
parent(i) = (i - 1) / 2       (integer division; i > 0)
```

```
index:  0   1   2   3   4   5   6
data:  [50][40][30][20][10][25][ 5]

            50(0)
         /        \
      40(1)       30(2)
     /    \      /    \
  20(3) 10(4) 25(5)  5(6)
```

**Levels:** level d holds indices `[2^d − 1, 2^(d+1) − 2]`. The height is ⌊log₂ n⌋.

### 2.3 The real code: the comparator is "less", and the top is the "largest"

```cpp
template <typename T, typename Comp = std::less<T>>
class priority_queue {
  protected:
    T *mData; size_t mCap; size_t mSize;
    Comp mLess;

    void fixUp(size_t idx) {                  // bubble up after push
      T tmp = mData[idx];
      while (idx > 0) {
        size_t p = (idx - 1) / 2;
        if (mLess(tmp, mData[p])) break;      // parent is "bigger", so stop
        mData[idx] = mData[p];
        idx = p;
      }
      mData[idx] = tmp;
    }
    void fixDown(size_t idx) {                // sink down after pop
      T tmp = mData[idx];
      size_t c;
      while ((c = 2 * idx + 1) < mSize) {
        if (c + 1 < mSize && mLess(mData[c], mData[c + 1])) c++;   // pick the bigger child
        if (mLess(mData[c], tmp)) break;
        mData[idx] = mData[c];
        idx = c;
      }
      mData[idx] = tmp;
    }
  public:
    const T& top() { return mData[0]; }
    void push(const T& e) { /* expand if needed */ mData[mSize++] = e; fixUp(mSize - 1); }
    void pop() { mData[0] = mData[mSize - 1]; mSize--; fixDown(0); }
};
```

**Comparator semantics (very important):**

* `mLess(a, b) == true` means "a has **lower** priority than b".
* With the default `std::less<T>`, the **largest** value is on top (a max-heap).
* With `std::greater<T>`, the smallest is on top.
* In `d58_q2_custom` you write the comparators in `song.h`. If you want pq1 to *output* songs in ascending (artist, title, count) order, the top must be the *smallest* tuple. So the comparator must return true when `a` is *larger* (a has lower priority). Get this backwards and the output is reversed.
* **Never use `<` directly inside a CP::priority_queue member function. Always use `mLess`.** The grader tests with custom comparators.
* "Equal priority" means `!mLess(a,b) && !mLess(b,a)`.

### 2.4 Complexities

| Operation | Time |
|---|---|
| top | O(1) |
| push (fixUp) | O(log n) |
| pop (fixDown) | O(log n) |
| build a heap from n items (fixDown from n/2−1 down to 0) | **O(n)** |
| find an arbitrary value | O(n), since a heap is *not* a search tree |

### 2.5 Deleting an arbitrary element (`ds03_heap_erase`)

1. Find its index i by a linear scan, O(n).
2. Move the last element into slot i, and do `mSize--`.
3. The moved element may be too big *or* too small for slot i, so call **both** `fixUp(i)` and `fixDown(i)`. Only one of them will move it. (If i was the last index, there's nothing to fix.)

### 2.6 Facts about the k-th largest element

* The k-th largest element must lie at depth ≤ k − 1, because each of its ancestors is larger than it. So for k ≤ 3, the candidates are the indices 0..6 (depth ≤ 2). Copy those (at most 7) elements, sort them *with mLess*, and pick the k-th from the top. That is the idea behind **`d64_q3a_heap_kth`** (and it fits a `const` function).
* **Rank of an element** (`d63_q3a_rank_in_heap`): "how many pops until top() equals x" is the number of elements with *strictly* higher priority than x, that is, the count of i with `mLess(x, mData[i])`. This is O(n), and you don't need to modify the heap.

### 2.7 Index arithmetic on subtrees (a recurring exam theme)

The descendants of node a, level by level:

```
level 0:  [a, a]
level 1:  [2a+1, 2a+2]
level 2:  [4a+3, 4a+6]
...       if the range on one level is [l, r], the next level is [2l+1, 2r+2]
stop when l >= n; clip r to n-1
```

So listing all descendants (`d62_q3a_heap_descendant`) takes O(number of descendants + log n). There is no need for recursion or for checking every index. The ranges are already in increasing order.

**Which nodes "might" have higher priority than node m?** (`da66_m1_heap_before_node`)
Ancestors certainly do, and descendants certainly don't (the heap order forces them lower). Any other node (siblings, cousins, …) *might* be higher or lower. So the answer is every index except m itself and its descendants. Generate it by walking 0..n−1 and skipping the descendant ranges from above, or by complementing them.

**Swapping a node's left and right subtrees** (`da68_m_heap_child_swap`): in a *full* tree, the left subtree of k on level d occupies a contiguous range [L, L + 2^d − 1], and the right subtree occupies the range immediately after it, of the same size. Swap level by level: on each level, swap the left block with the right block (`std::swap_ranges`). The total work is O(subtree size).

```cpp
// sketch: swap the subtrees of node k in a heap of size n (full tree)
size_t l = 2*k + 1, r = 2*k + 2, width = 1;
while (l < n) {
    // the left block is [l, l+width-1], the right block is [r, r+width-1]
    for (size_t t = 0; t < width; t++) std::swap(mData[l + t], mData[r + t]);
    l = 2*l + 1;  r = 2*r + 1;  width *= 2;
}
```

(Check the formula on a drawing: the left child of the *first* node in the left block is `2l+1`, and the right block's first node is `r`, with the same reasoning.)

**Ordered heap reconstruction** (`da68_m2_ordered_heap_reconstruction`): the goal is for the array to be *fully sorted* (index order = priority order) after choosing, for some nodes, to swap their left and right subtrees. Think recursively from the root. At node i, after the decisions made above it, compare the two children's values (with `mLess`). If the left child has lower priority than the right, node i must swap. Then the decision for each child depends on the arrangement *after* the swap. Two ways to implement it:

1. Simulate: copy `mData` to a scratch array, process nodes in index order (BFS), and whenever a node needs a swap, record its index and swap the subtrees *in the copy* (section above).
2. Recurse with "virtual" positions: keep track of which *original* index currently occupies each position.

Return the recorded indices sorted.

### 2.8 Using the STL heap in full programs

```cpp
priority_queue<long long> mx;                                   // max on top
priority_queue<long long, vector<long long>, greater<>> mn;     // min on top
// k cheapest items:
for (auto c : costs) mn.push(c);
while (k-- && !mn.empty()) { total += mn.top(); mn.pop(); }
```

---

## 3. Common traps

1. **Comparator direction**, explained above. Write a 3-element test.
2. **`size_t` underflow in `(idx - 1) / 2`** when idx = 0. Only compute the parent when idx > 0.
3. **Forgetting `const`** in `get_kth`, `get_rank` and similar. You can't call `fixDown` there. Copy into a local `std::vector<T>`.
4. **Off by one on levels:** level d has 2^d nodes, starting at 2^d − 1.
5. **Erase:** calling only fixDown (or only fixUp) fails some tests.
6. **Memory:** `da68_m_heap_child_swap` gives 128 MB. Swap in place; don't copy whole subtrees into new vectors repeatedly.

---

## 4. Grader problems for this lesson

| Problem | Task | Key idea |
|---|---|---|
| `d63_q3a_rank_in_heap` | number of pops until top equals mData[pos] | count `mLess(x, mData[i])`, 2.6 |
| `d64_q3a_heap_kth` | k-th to be popped, k ≤ 3, const | candidates are indices 0..6, sort with mLess, 2.6 |
| `ds03_heap_erase` | erase value v | swap with the last element + fixUp & fixDown, 2.5 |
| `d58_q2_custom` | write song comparators for 2 priority queues | 2.3 comparator semantics |
| `d62_q3a_heap_descendant` | list all descendants of a, sorted | level ranges [2l+1, 2r+2], 2.7 |
| `da66_m1_heap_before_node` | indices that *may* have higher priority than m | everything except m and its descendants, 2.7 |
| `da68_m_heap_child_swap` | swap the subtrees of k | level-by-level block swap, 2.7 |
| `da68_m2_ordered_heap_reconstruction` | which nodes need a subtree swap to make the array sorted | top-down simulation, 2.7 |

---

## 5. Exercises

1. For n = 10, list the children of 4 and the parent of 9.
2. Insert 35 into the heap `[50,40,30,20,10,25,5]` and show the array after fixUp.
3. Pop once from that original heap and show the result.
4. Show that the 3rd largest element of a max-heap can't be at depth 3.
5. Using CP::priority_queue with `std::greater<int>`, what is `top()` after pushing 5, 1, 9?

### Answers

1. The children of 4 are 9 and 10, but only 9 exists (n = 10, so the indices are 0..9). The parent of 9 is (9−1)/2 = 4.
2. Put 35 at index 7. Its parent is 3 (value 20); 35 > 20, so it moves up. Its new parent is 1 (40); 35 < 40, so it stops. The result is `[50,40,30,35,10,25,5,20]`.
3. Move 5 to the root: `[5,40,30,20,10,25]`. Sink: the bigger child is 40, so swap, giving `[40,5,30,20,10,25]`. The children of index 1 are 20 and 10; swap with 20, giving `[40,20,30,5,10,25]`.
4. A node at depth 3 has 3 ancestors, all strictly larger (with distinct values), so at least 3 elements beat it. Its rank is ≥ 4.
5. 1 (the smallest is on top).
