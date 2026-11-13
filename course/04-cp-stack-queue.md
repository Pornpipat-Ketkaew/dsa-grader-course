# Lesson 04: Stacks and Queues (`CP::stack`, `CP::queue` as a Circular Buffer)

> **Goal:** understand LIFO and FIFO, master **circular-buffer index arithmetic**, and be able to add any operation to `CP::stack` and `CP::queue`.

---

## 1. Why it matters

* **Stack problems:** `d62_q2b_stack_deep_push`, `d65_q2a_mitosis`, `da68_m_stack_of_stack`.
* **Queue problems:** `d60_q1_qat`, `d62_q3b_queue_m2f`, `d63_q3a_queue_m2b`, `d64_q3b_queue_reverse`, `d65_q3b_queue_total_reverse`, `da66_m1_queue_remove_many`, `da67_m2_queue_insert_shuffle`, `da67_m_queue_block_insert`.
* Queues are the engine of **BFS** (Lesson 16), and stacks are the engine of **DFS** and recursion (Lesson 11).

---

## 2. Stack (LIFO: Last In, First Out)

### 2.1 Implementation in this course

```cpp
template <typename T>
class stack {
  protected:
    T *mData; size_t mCap; size_t mSize;
  public:
    const T& top() const { return mData[mSize-1]; }   // top = LAST array slot
    void push(const T& e) { ensureCapacity(mSize+1); mData[mSize] = e; mSize++; }
    void pop() { mSize--; }
};
```

```
index:    0    1    2    3
mData:  [10] [20] [30] [40]     mSize = 4
         bottom          top
"element k from the top"  =  mData[mSize - 1 - k]
```

**The single most important formula:** *the k-th element from the top* (k = 0 is the top) lives at **`mData[mSize - 1 - k]`**.

### 2.2 Inserting "deep" inside a stack

`deep_push(pos, value)` must place `value` so that it ends up `pos` places below the top. With pos = 0 it is a normal push, and with pos = size() it goes to the very bottom.

Translate this into an array operation: after the insertion, value sits at index `mSize - pos` (computed with the *old* mSize). Everything at indices ≥ `mSize - pos` shifts up by one. That is exactly `vector::insert` at index `mSize - pos`:

```
before (mSize=3): [10][20][30]          deep_push(1, X)  → insert at index 3-1 = 2
after:            [10][20][ X][30]
```

### 2.3 Duplicating a block (`mitosis(a, b)`)

Each element from a-th to b-th from the top gets a **copy next to it**. The stack grows by `b - a + 1`. Do it in one pass:

1. Call `ensureCapacity(mSize + (b - a + 1))` **once**.
2. Fill the new array *from the top downward* (from the end of the array toward the start), so you never overwrite something you still need. Elements above the a-th move up by `b-a+1`, elements in the range are written twice, and elements below b stay put.

Draw indices on paper first: with old size n, the k-th from the top is at `n-1-k`.

### 2.4 Stack of stacks (`da68_m_stack_of_stack`)

The data is `vector<vector<T>> mData`, where block i has capacity i+1 (block 0 holds 1 element, block 1 holds 2, …). `push` appends to the last block, or opens a new block if the last one is full. `pop` removes from the last block and drops the block if it becomes empty. `size()` must be fast: keep a counter, or compute it as the sum of full blocks, k(k+1)/2, plus the size of the last block.

---

## 3. Queue (FIFO: First In, First Out) as a circular buffer

### 3.1 Why circular?

If we popped by shifting everything left, `pop` would cost O(n). Instead, we keep a moving **front index** and let the data **wrap around** the end of the array.

```cpp
template <typename T>
class queue {
  protected:
    T *mData; size_t mCap; size_t mSize; size_t mFront;
  public:
    const T& front() const { return mData[mFront]; }
    const T& back()  const { return mData[(mFront + mSize - 1) % mCap]; }
    void push(const T& e) {
      ensureCapacity(mSize + 1);
      mData[(mFront + mSize) % mCap] = e;
      mSize++;
    }
    void pop() { mFront = (mFront + 1) % mCap; mSize--; }
};
// expand copies the elements IN LOGICAL ORDER into the new array, and sets mFront = 0
```

Picture with mCap = 8, mFront = 6, mSize = 4:

```
physical: 0    1    2    3    4    5    6    7
        [ C ][ D ][   ][   ][   ][   ][ A ][ B ]
                                       ^front
logical order: A(0) B(1) C(2) D(3)
```

### 3.2 The master formula

> **Logical position i (0 = front) is stored at physical index `(mFront + i) % mCap`.**

Everything in the queue problems follows from this one line. Some derived facts:

* back = position `mSize - 1`.
* The next free slot (where push writes) = position `mSize`.
* Moving the front backward by one (push to the front): `mFront = (mFront + mCap - 1) % mCap`. **Add mCap before subtracting**, because `size_t` is unsigned.
* Negative index k (−1 = last): convert to the positive position `mSize + k`.

### 3.3 Strategy: write a helper, think logically

Inside a member function, define (as a lambda or with the inline expression):

```cpp
auto at = [&](size_t i) -> T& { return mData[(mFront + i) % mCap]; };
```

Then write the algorithm as if the queue were a normal array `at(0..mSize-1)`. This removes almost all modular-arithmetic bugs.

### 3.4 Typical queue operations

**(a) Moving one element to the front** (`move_to_front(pos)`): save x = at(pos). For i = pos down to 1: at(i) = at(i−1). Then at(0) = x. That is O(pos). (Alternatively, shift the *front* part backward and move mFront.)

**(b) Moving one element to the back** (`move_to_back(pos)`): save x = at(pos), shift at(pos+1 .. mSize−1) left by one, and put x at the back.

**(c) Reversing a logical range [a, b]**: the two-pointer swap from Lesson 03, applied with `at(i)`.

**(d) Removing many positions** (`remove_many`, positions unsorted): mark the deleted positions in a `vector<bool>`, then compact with a write index over `at()`. That is O(n + k). Don't call a single-element erase k times.

**(e) Inserting many elements** (`insert_shuffle`, `block_insert`): the cleanest correct approach is to **build a new array** of capacity ≥ the new size, write the elements in their final logical order starting at physical index 0, free the old array, and set `mFront = 0`. That is O(n + m).

```cpp
// generic rebuild skeleton (inside a CP::queue member function)
size_t newSize = mSize + m;
size_t newCap  = std::max(mCap, newSize);
T *arr = new T[newCap]();
size_t k = 0;
for (size_t i = 0; i < mSize; i++) {
    // ... decide what to emit before old element i ...
    arr[k++] = mData[(mFront + i) % mCap];
}
// ... emit anything that goes after the last old element ...
delete [] mData;
mData = arr; mCap = newCap; mSize = newSize; mFront = 0;
```

### 3.5 O(1) total reverse (`d65_q3b_queue_total_reverse`)

Reversing all n elements physically costs O(n). The intended trick is to **flip a flag**. The class gives you `int aux` (0 at construction). Let `aux = 1` mean "the logical front is at the physical back". Then each of `front`, `back`, `push` and `pop` checks the flag:

| Operation | aux == 0 (normal) | aux == 1 (reversed) |
|---|---|---|
| front | `mData[mFront]` | `mData[(mFront + mSize - 1) % mCap]` |
| back | `mData[(mFront + mSize - 1) % mCap]` | `mData[mFront]` |
| push (to logical back) | write at `(mFront + mSize) % mCap` | move mFront back one step, write at `mFront` |
| pop (from logical front) | `mFront++` (mod) | just `mSize--` |

`reverse()` itself becomes `aux = 1 - aux`. Note that `expand` copies in *physical* order starting at mFront, which keeps the arrangement valid in both modes. Check this yourself on paper. This idea of **"represent a state lazily instead of doing the work"** comes up again and again.

---

## 4. Complexity

| Operation | Stack | Queue |
|---|---|---|
| push/pop/top/front/back | O(1) amortized | O(1) amortized |
| `q[k]` | n/a | O(1) |
| move one element by distance d | O(d) | O(d) |
| insert/remove many (rebuild) | O(n + m) | O(n + m) |

---

## 5. Common traps

1. **Unsigned wrap-around:** `(mFront - 1) % mCap` with mFront = 0 gives garbage. Write `(mFront + mCap - 1) % mCap`.
2. **Index direction in stacks:** "from the top" means counting from `mSize-1` downward.
3. **Forgetting `ensureCapacity`** before writing past mSize.
4. **Modifying `mCap` without moving the data:** if you change mCap, the `% mCap` mapping changes too, so you must rebuild (that's why `expand` copies to a fresh array).
5. **`const` functions** (`operator[]` in `d60_q1_qat`): you can't change members; only read.
6. **Reading `main.cpp`:** check whether positions are 0-based, whether they're guaranteed sorted or unique, and what gets printed.

---

## 6. Grader problems for this lesson

| Problem | Task | Key idea |
|---|---|---|
| `d60_q1_qat` | `q[k]`, negative k counts from the back | master formula; k<0 → k += mSize |
| `d62_q2b_stack_deep_push` | push pos places below the top | vector insert at index mSize−pos |
| `d62_q3b_queue_m2f` | move position pos to the front | 3.4(a) |
| `d63_q3a_queue_m2b` | move position pos to the back | 3.4(b) |
| `d64_q3b_queue_reverse` | reverse logical range [a, b] | two pointers with `at()` |
| `da66_m1_queue_remove_many` | remove a list of positions | mark + compact (3.4 d). Verify the sample against `main.cpp` |
| `d65_q2a_mitosis` | duplicate elements a..b from the top | section 2.3 |
| `da67_m2_queue_insert_shuffle` | interleave new items starting at pos, leftovers at the end | rebuild (3.4 e) |
| `da67_m_queue_block_insert` | insert m copies at position p | rebuild, or ensureCapacity and shift the shorter side |
| `d65_q3b_queue_total_reverse` | O(1) reverse | flag `aux` (3.5) |
| `da68_m_stack_of_stack` | stack built from growing blocks | section 2.4 |

---

## 7. Exercises

1. A queue has mCap = 5, mFront = 3, mSize = 4. What are the physical indices of positions 0..3?
2. Write `T& CP::queue<T>::at_from_back(size_t k)` (k = 0 is the back).
3. In a stack of size 6, where is the 2nd element from the top?
4. Why does reversing with a flag still work after `expand` is called?
5. Implement `void CP::stack<T>::remove_top_k(size_t k)` in O(1).

### Answers

1. 3, 4, 0, 1.
2. `return mData[(mFront + mSize - 1 - k) % mCap];`
3. `mData[6 - 1 - 2] = mData[3]`.
4. `expand` copies physical slots `mFront, mFront+1, …` into `0, 1, …` in the same order, so whichever physical end is the "logical front" keeps its role.
5. `mSize -= std::min(k, mSize);`
