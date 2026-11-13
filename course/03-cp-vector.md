# Lesson 03: Dynamic Arrays and `CP::vector`

> **Goal:** understand exactly how a dynamic array works in memory, so you can add *any* new operation to `CP::vector` correctly and with the complexity the problem demands.

---

## 1. Why it matters

These grader problems all ask you to add a member function to `CP::vector<T>`:

`ds00_reverse2`, `d58_q1_erase_many`, `d59_q1_range_insert`, `d60_q1_v_uniq`, `d62_q2b_vector_insert_many`, `d63_q2b_vector_compress`, `d64_q2a_vector_block_swap`, `da67_m_count_distinct`, `da68_m2_vector_range_aggregate`, `da68_m_compressed_vector` (a run-length variant).

Related: `d63_q2a_pair_gte` (CP::pair) and `d63_q1a_multi_insert` (std::vector).

---

## 2. Theory: the dynamic array

A plain array `T a[100]` has a fixed size. A **dynamic array** keeps three things:

```
mData ──► [ 10 | 20 | 30 | 40 |  ?  |  ?  |  ?  |  ?  ]
            0    1    2    3    4     5     6     7
mSize = 4     (number of elements actually stored)
mCap  = 8     (number of slots allocated)
```

**Invariant** (always true between operations): `0 ≤ mSize ≤ mCap`, and the elements are `mData[0 .. mSize-1]` in order.

### 2.1 The real code (from `vector.h` in this folder)

```cpp
namespace CP {
template <typename T>
class vector {
  public:
    typedef T* iterator;          // an iterator is just a pointer!
  protected:
    T *mData;
    size_t mCap;
    size_t mSize;

    void expand(size_t capacity) {            // reallocate to a new capacity
      T *arr = new T[capacity]();
      for (size_t i = 0; i < mSize; i++) arr[i] = mData[i];
      delete [] mData;
      mData = arr;
      mCap = capacity;
    }
    void ensureCapacity(size_t capacity) {    // grow at least 2x
      if (capacity > mCap) {
        size_t s = (capacity > 2 * mCap) ? capacity : 2 * mCap;
        expand(s);
      }
    }
  public:
    iterator begin() { return &mData[0]; }
    iterator end()   { return begin() + mSize; }
    T& operator[](int index) { return mData[index]; }

    iterator insert(iterator it, const T& element) {
      size_t pos = it - begin();          // (1) convert the iterator to an index FIRST
      ensureCapacity(mSize + 1);          // (2) this may reallocate, so `it` is now invalid!
      for (size_t i = mSize; i > pos; i--) mData[i] = mData[i-1];   // (3) shift right
      mData[pos] = element;
      mSize++;
      return begin() + pos;
    }
    void erase(iterator it) {             // shift left
      while ((it + 1) != end()) { *it = *(it + 1); it++; }
      mSize--;
    }
    void push_back(const T& e) { insert(end(), e); }
    void pop_back() { mSize--; }
    void clear() { mSize = 0; }
};
}
```

### 2.2 Three ideas you must master

**Idea 1: an iterator is a pointer, so convert it to an index before reallocating.**
`insert` computes `pos = it - begin()` *before* calling `ensureCapacity`, because `expand` frees the old array and `it` then points into freed memory. Every function you write that takes iterators and may grow the array **must do the same** (`d59_q1_range_insert`).

**Idea 2: shifting costs O(n).**
Inserting or erasing at position p moves `mSize - p` elements. Calling `insert` k times in a loop therefore costs O(k·n). Many exam problems (`erase_many`, `insert_many`, `range_insert`, `multi_insert`) are designed so that **the naive loop is too slow**, and you must do all the work in **one pass**.

**Idea 3: doubling gives amortized O(1) `push_back`.**
Growing to `2·mCap` means n pushes copy at most 1 + 2 + 4 + … + n < 2n elements in total. If we grew by +1 each time, it would be 1 + 2 + … + n = O(n²).

### 2.3 Pattern A: one-pass compaction (deleting many elements)

To delete a *set* of positions, keep a **write index** `w`. Walk the array with a read index `r`, and copy each element you keep down to `mData[w++]`.

```
keep?   Y   N   Y   N   N   Y
data   [a] [b] [c] [d] [e] [f]
         r→ copies a→0, c→1, f→2;   mSize = 3
```

```cpp
// generic example: remove all negative numbers in O(n)
template <typename T>
void remove_negatives(T* mData, size_t &mSize) {
  size_t w = 0;
  for (size_t r = 0; r < mSize; r++)
    if (!(mData[r] < 0)) mData[w++] = mData[r];
  mSize = w;
}
```

To know whether position r is deleted, use a `std::vector<bool>` mark array, or walk a **sorted** list of positions with a second pointer. Both are O(n).

### 2.4 Pattern B: build a new array in one pass (inserting many elements)

When many things are inserted, it is easiest to allocate a *new* array of the final size, fill it from left to right by merging "old elements" with "new elements in position order", and then swap it in:

```cpp
T *arr = new T[newCap]();
size_t k = 0;                       // write index
// ... interleave old elements and inserted elements into arr[k++] ...
delete [] mData;
mData = arr;  mSize = k;  mCap = newCap;
```

**Positions refer to the original vector.** In `d62_q2b_vector_insert_many`, `(2,"Z")` means "before the element that was at index 2 *before any insertion*". So sort the requests by position, and while copying old element i, first emit all requests whose position equals i. Requests with position == old size go at the end.

### 2.5 Pattern C: two-pointer reversal and swapping

```cpp
// reverse [first, last) in place
template <typename T>
void my_reverse(T* first, T* last) {
  while (first < last) {      // pointers compare by address
    --last;
    if (first == last) break;
    std::swap(*first, *last);
    ++first;
  }
}
```

### 2.6 Pattern D: work on a copy when you need sorting

If a function must report something about a range *without changing it* (count distinct, median), copy the range to a `std::vector<T>`, sort it (or use `nth_element`), and compute. That costs O(L log L) for a range of length L.

### 2.7 Pattern E: shrink (exact capacity)

`d63_q2b_vector_compress` wants `mCap == mSize`. Allocate `new T[mSize]`, copy, free the old array, and set `mCap = mSize`. Think about **mSize = 0**: `new T[0]` is legal, but `begin()` returns `&mData[0]`. Read the problem and `main.cpp` to see what it expects (some solutions keep a capacity of at least 1).

---

## 3. Complexity summary

| Operation | Time |
|---|---|
| `operator[]`, `size`, `back`, `pop_back` | O(1) |
| `push_back` | amortized O(1), worst O(n) |
| `insert`/`erase` at position p | O(n − p) |
| k separate inserts or erases (naive) | O(k·n), usually **TLE** |
| one-pass compaction or rebuild | O(n + k) (plus O(k log k) if you must sort positions) |

---

## 4. Common traps

1. **Using an iterator after reallocation.** Convert to an index first.
2. **Inserting a range that comes from the same vector** (`d59_q1_range_insert` may call `v.insert(pos, v.begin(), v.end())`). If you reallocate, `first` and `last` point to freed memory, and if you shift in place you overwrite the source. **Fix:** copy `[first, last)` into a temporary `std::vector<T>` before you change anything.
3. **Forgetting `delete []`** costs memory, and the grader may give MLE on big tests.
4. **Off-by-one on inclusive ranges.** `aggregate(l, r)` is *inclusive* [l, r], `count_distinct(a, b)` is half-open [a, b), and `block_swap(a, b, m)` covers [a, a+m−1] and [b, b+m−1]. Read each statement.
5. **Validation conditions** (`block_swap`): m > 0, both blocks lie completely inside [begin, end), and the blocks don't overlap. Check everything *before* changing data, and return `false` otherwise.
   * Two ranges [a, a+m) and [b, b+m) overlap iff `a < b+m && b < a+m`.
   * Pointer comparisons work (`a >= begin()`, `a + m <= end()`), but compute in indices (`a - begin()`) to avoid going past the end.
6. **Templates and comparison.** `uniq` works for int, float and string. Anything that needs `<` (sort, set) works for these, but don't assume arithmetic.

---

## 5. Worked mini-example (not a grader problem): `remove_value(x)`

*Remove every element equal to x in O(n).*

```cpp
template <typename T>
void CP::vector<T>::remove_value(const T& x) {
  size_t w = 0;
  for (size_t r = 0; r < mSize; r++) {
    if (!(mData[r] == x)) {
      mData[w] = mData[r];
      w++;
    }
  }
  mSize = w;      // the capacity is unchanged; slots >= w are just ignored
}
```

Why it is correct: **loop invariant**: after processing r elements, `mData[0..w-1]` holds exactly the kept elements among the first r, in their original order. Since w ≤ r, we never overwrite an element we haven't read yet.

---

## 6. `CP::pair` and comparison operators (`d63_q2a_pair_gte`)

The task is to implement `operator>=` for a pair **without** using `<` or `==` on the pair. Think in terms of the members:

* (a₁, b₁) ≥ (a₂, b₂) iff a₁ > a₂, or (a₁ == a₂ and b₁ ≥ b₂).
* Check which operators you're allowed to use on the *members* (the statement lists them), and rewrite "==" as "neither is less than the other": `!(x<y) && !(y<x)`.

---

## 7. Run-length encoding (`da68_m_compressed_vector`)

`CompressedVector` stores runs: `mDataV = {1,2,3,20,-4}` holds the values and `mDataL = {3,2,1,2,2}` holds the run lengths, which represents `{1,1,1,2,2,3,20,20,-4,-4}`. `mSize` is the number of **runs**.

* **`operator[](index)`**: walk the runs subtracting lengths until index < mDataL[i]. That is O(#runs).
* **`expand(cap)`**: like `CP::vector::expand`, but for *both* arrays.
* **`insert(index, element)`**: find the run containing the logical index, then decide:
  * if the element equals that run's value (or the value of the run that ends right before index), just increase its length;
  * if the index falls *inside* a run with a different value, **split** it into left part, new run of length 1, right part (this adds 2 runs);
  * if the index is on a boundary, add one new run there (shift the arrays right).
  Draw all four cases on paper before coding. Check `main.cpp` for how `insert` is called, including what `push_back` passes.

---

## 8. Grader problems for this lesson (easy to hard)

| Problem | What to do | Key idea |
|---|---|---|
| `ds00_reverse2` | reverse a sub-range of a vector manually | Pattern C (two pointers) |
| `d63_q2b_vector_compress` | shrink mCap to mSize | Pattern E |
| `d63_q2a_pair_gte` | `operator>=` for CP::pair | lexicographic logic |
| `d58_q1_erase_many` | erase many sorted positions in O(n) | Pattern A |
| `d60_q1_v_uniq` | keep the first occurrence of each value | Pattern A + a `std::set<T>` of values seen (O(n log n)) |
| `da67_m_count_distinct` | distinct values in [a, b) | Pattern D (copy, sort, count changes) or a `set` |
| `d64_q2a_vector_block_swap` | validate, then swap two blocks | trap 5, `std::swap` element by element |
| `d59_q1_range_insert` | `insert(position, first, last)` | idea 1 + trap 2 + a single shift by `k = last − first` |
| `d62_q2b_vector_insert_many` | many inserts at original positions | Pattern B (sort requests by position) |
| `da68_m2_vector_range_aggregate` | replace [l, r] with its lower median | Pattern D (`nth_element` at index (len−1)/2), then compact the tail: write the median at l and shift `mData[r+1..]` left by (r − l) |
| `d63_q1a_multi_insert` | std::vector multi insert | use `insert(it, count, value)` once |
| `da68_m_compressed_vector` | run-length vector | Section 7 |

---

## 9. Exercises

1. Why does `CP::vector::insert` compute `pos` before `ensureCapacity`?
2. You call `v.insert(v.begin(), x)` n times on an empty vector. What is the total complexity?
3. Write `void CP::vector<T>::rotate_left(size_t k)` (move the first k elements to the end) in O(n) time and O(n) extra memory. Then try O(1) extra memory using three reversals.
4. In erase_many, the positions `{1, 3, 4}` are deleted from `{a,b,c,d,e,f}`. Trace w and r.
5. What is the median, by this course's definition, of {4, 1, 3, 2}?

### Answers

1. Because `ensureCapacity` may reallocate and free the old array, after which `it` dangles. The index stays valid.
2. Each insert at the front shifts every element: 0 + 1 + … + (n−1) = O(n²).
3. With extra memory: `tmp[i] = mData[(i + k) % mSize]`, then copy back. In place: reverse [0, k), reverse [k, n), reverse [0, n).
4. r=0 keep a (w=1); r=1 skip b; r=2 keep c (w=2); r=3 skip d; r=4 skip e; r=5 keep f (w=3). The result is {a, c, f}.
5. Sorted {1,2,3,4}. With an even count, take the right-most element of the left half: **2** (index (4−1)/2 = 1).
