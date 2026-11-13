# Lesson 01: C++ for the Grader, and Complexity Analysis

> **Goal:** be able to read any problem statement, decide how fast your program must be, and write C++ that is fast, does not overflow, and compiles together with the grader's files.

---

## 1. Why this lesson matters

Every grader problem is judged on four things:

1. **Correct output**, compared character by character.
2. **Time limit**, usually 1 second.
3. **Memory limit**, usually 64 to 512 MB (one problem, `da66_f1_map_walk`, gives only 32 MB).
4. **It compiles.** For `student.h` problems it must compile *together with the grader's own `main.cpp`*.

Most lost points come from these, not from "bad ideas":

* `int` overflow (`a65_q2a_huge_array`, `da67_m_chocolate_truffle`, `da68_f2_sackknap`, `ex01m3`),
* using `cin` without fast I/O on 10⁶ numbers (`d57_q3_zuma`, `a65_q0_degrees`),
* an O(n²) algorithm when n = 10⁵.

---

## 2. Complexity: how to estimate running time

### 2.1 The rule of thumb

A modern grader machine does about **10⁸ simple operations per second**, give or take a factor of 2 or 3.

So before you write code, compute *n* from the constraints and look at this table:

| Largest n | Acceptable complexity | Typical algorithm |
|---|---|---|
| n ≤ 10–12 | O(n!) | all permutations, N-Queens (`ex07e1_nqueen`) |
| n ≤ 20–25 | O(2ⁿ · n) | all subsets, bitmask DP (`a64_q4_path_sum`) |
| n ≤ 100–500 | O(n³) | Floyd-Warshall, interval DP |
| n ≤ 1 000–5 000 | O(n²) | dense Dijkstra, Prim on a matrix, LCS, LPS |
| n ≤ 10⁵–10⁶ | O(n log n) | sorting, heap, binary search, `std::map` |
| n ≤ 10⁷–10⁸ | O(n) | single pass, prefix sums, linear DP (`a64_q2_table_no_11` has n ≤ 10⁷) |
| n ≤ 10¹⁸ | O(log n) | binary search on the answer, fast power (`a60_q1_matmod`) |

**The most useful skill in this whole course is reading the constraint and immediately guessing the intended complexity.**

### 2.2 Big-O, Big-Ω, Big-Θ (formal definitions)

* f(n) ∈ **O(g(n))** if there exist c > 0 and n₀ such that f(n) ≤ c·g(n) for all n ≥ n₀. This is an *upper bound*.
* f(n) ∈ **Ω(g(n))** if f(n) ≥ c·g(n) for large n. This is a *lower bound*.
* f(n) ∈ **Θ(g(n))** if both hold. This is a *tight bound*.

Rules you use constantly:

* Drop constants and lower-order terms: 3n² + 100n + 7 ∈ Θ(n²).
* Nested loops multiply, consecutive loops add.
* log_a n and log_b n differ only by a constant, so we just write log n.
* A loop that halves its range each step runs O(log n) times.
* 1 + 2 + … + n = n(n+1)/2 ∈ Θ(n²).
* 1 + 2 + 4 + … + 2^k = 2^(k+1) − 1 ∈ Θ(2^k). This is why doubling the vector capacity costs **amortized O(1)** per `push_back` (Lesson 03).
* 1 + 1/2 + 1/3 + … + 1/n ≈ ln n. This shows up when you loop over multiples, as in a sieve.

### 2.3 Analysing recursive code: recurrences

| Recurrence | Solution | Example |
|---|---|---|
| T(n) = T(n−1) + O(1) | O(n) | recursive sum, linked list walk |
| T(n) = T(n−1) + O(n) | O(n²) | selection sort, naive insert |
| T(n) = T(n/2) + O(1) | O(log n) | binary search, fast power |
| T(n) = 2T(n/2) + O(1) | O(n) | tree traversal |
| T(n) = 2T(n/2) + O(n) | O(n log n) | merge sort |
| T(n) = 2T(n−1) + O(1) | O(2ⁿ) | naive Fibonacci (roughly φⁿ), subsets |
| T(n) = n·T(n−1) | O(n!) | permutations |

**Master theorem** (for T(n) = a·T(n/b) + Θ(n^d)):

* if d > log_b a, then T = Θ(n^d)
* if d = log_b a, then T = Θ(n^d log n)
* if d < log_b a, then T = Θ(n^(log_b a))

### 2.4 Amortized analysis

Some operations are occasionally expensive but cheap on average. For example, `push_back` on a vector costs O(n) when it doubles the array, but n pushes cost at most n + (1 + 2 + 4 + … + n) < 3n in total, so each push is **amortized O(1)**. Graders test many operations in a row, so *amortized* cost is what matters.

### 2.5 Memory estimation

* `int` = 4 bytes, `long long` = 8, `double` = 8, `char`/`bool` = 1, a pointer = 8.
* A 5000 × 5000 `int` array = 25·10⁶ · 4 bytes = **100 MB**. Check the limit! (`da66_f1_sea_bridge` has a grid up to 5000 × 5000, so store it as `char`, which takes 25 MB.)
* `vector<vector<int>>` has an overhead of about 24 bytes per inner vector.
* Recursion depth: each call frame uses tens to hundreds of bytes, and the default stack on many judges is 8 MB or less. **A recursion 5·10⁵ levels deep (a skewed BST in `da66_m1_tree_leaves_depth` or `da67_m2_bst_parity_score`) may crash.** Prefer an explicit stack or BFS when the depth can reach the hundreds of thousands.

---

## 3. Integer types and overflow

| Type | Range |
|---|---|
| `int` | about ±2.1·10⁹ (2³¹ − 1 = 2 147 483 647) |
| `unsigned int` | 0 … 4.29·10⁹ |
| `long long` | about ±9.2·10¹⁸ |
| `unsigned long long` | 0 … 1.8·10¹⁹ |

**Rules:**

1. If any value or **intermediate product or sum** can exceed 2·10⁹, use `long long`.
   * `ex00e3` has values in [−2·10⁹, 2·10⁹]. These fit in `int`, but a comparison such as `x - 1` could overflow, so use `long long` to be safe.
   * `da67_m_chocolate_truffle`: R, C ≤ 10⁹, so cell number (p−1)·C + q needs `long long`.
   * `ex01m3`: customer number ≤ 10¹², so `long long`.
2. Write `1LL * a * b` or `(long long)a * b`. Plain `a * b` with two `int`s overflows *before* it is assigned to a `long long`.
3. **Modular arithmetic**: when a problem says "print the answer mod 100000007", reduce after every addition and multiplication:
   ```cpp
   const long long MOD = 100000007;
   ans = (ans + x) % MOD;
   ans = (ans * y) % MOD;          // ans, y < MOD, so the product < 10^16 fits in long long
   ans = ((ans - x) % MOD + MOD) % MOD;   // subtraction: keep the result non-negative
   ```
4. `size_t` is **unsigned**. `for (size_t i = n - 1; i >= 0; i--)` is an infinite loop, because `i >= 0` is always true, and when n = 0, `n - 1` becomes a huge number. Use `int` for a loop that counts down, or write `for (size_t i = n; i-- > 0; )`.
5. Mixing signed and unsigned: `if (v.size() - 1 < k)` when `v` is empty gives 2⁶⁴ − 1. Cast the size first: `(int)v.size()`.

---

## 4. Fast input / output

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);   // unlink cin/cout from C stdio
    cin.tie(nullptr);                   // don't flush cout before every cin
    int n; cin >> n;
    // ...
    cout << ans << '\n';                // '\n' not endl (endl flushes every time)
}
```

* With these two lines, `cin` is about as fast as `scanf`. **Don't mix** `scanf` and `cin` after you call `sync_with_stdio(false)`.
* `endl` flushes the output buffer. Printing 10⁵ lines with `endl` can cause TLE.
* For `student.h` problems, the grader's `main.cpp` does the I/O, so you don't need any of this.

Reading patterns you will need:

```cpp
// read until end of file
int x;
while (cin >> x) { ... }

// read a grid of characters
int R, C; cin >> R >> C;
vector<string> g(R);
for (auto &row : g) cin >> row;

// read a grid of digits separated by spaces
vector<vector<int>> a(R, vector<int>(C));
for (int i = 0; i < R; i++) for (int j = 0; j < C; j++) cin >> a[i][j];
```

---

## 5. C++ features the CP library uses (read this before Lesson 03)

### 5.1 Pointers and dynamic arrays

```cpp
int *p = new int[10]();   // 10 ints, zero-initialised by ()
p[3] = 7;                 // same as *(p + 3) = 7
int *q = p + 3;           // pointer arithmetic: q points at p[3]
size_t idx = q - p;       // 3: subtracting pointers gives a distance
delete [] p;              // memory allocated with new[] must be freed with delete[]
```

`CP::vector<T>::iterator` is **just `T*`**. So `it - begin()` is an index, `begin() + k` is the address of element k, and `*it` is the element.

### 5.2 Templates

```cpp
template <typename T>
class box {
    T value;
public:
    void set(const T& v);
};

// defining a member function outside the class (this is exactly what student.h does)
template <typename T>
void box<T>::set(const T& v) { value = v; }
```

When a class lives in a namespace, the definition is written as `CP::vector<T>::erase_many(...)`.

### 5.3 Classes: `this`, members, `const` member functions

* Inside a member function you can use the protected fields directly: `mData`, `mSize`, `mCap`.
* A `const` member function (`... ) const {`) **cannot modify** members. In `d60_q1_qat` the stub is `T operator[](int idx)`, in `d64_q3a_heap_kth` `get_kth(size_t k) const`, and in `da67_m_bst_lca` `lca(...) const`. Inside these you cannot call non-const functions or change `mData`.

### 5.4 Functors (comparator objects)

```cpp
struct ByLength {
    bool operator()(const string& a, const string& b) const {
        return a.size() < b.size();
    }
};
ByLength cmp;
cmp("ab", "abc");   // true
```

`std::less<T>` is a functor whose `operator()` does `a < b`. `CP::priority_queue` stores one as `mLess` and calls `mLess(a, b)`. **Always compare through `mLess`, never with `<`**, because the grader may instantiate the class with a custom comparator (Lesson 06).

### 5.5 References

```cpp
void inc(int &x) { x++; }       // modifies the caller's variable
node* &link = parent->left;     // a reference to a pointer: assigning link changes parent->left
link = newNode;
```

`map_bst::child_link` returns `node*&` for this reason (Lesson 07).

### 5.6 Copy-and-swap, destructors, `delete`

Every CP container owns its memory: the constructor calls `new`, and the destructor calls `delete`. When you write a member function that **replaces** the internal array:

```cpp
T *arr = new T[newCap]();
for (size_t i = 0; i < mSize; i++) arr[i] = mData[i];
delete [] mData;         // free the old one, otherwise you leak memory
mData = arr;
mCap = newCap;
```

Some problems say **"do not create or delete nodes"** (`d59_q3_bst_split`, `d61_q2_splitlist`, `da67_m2_list_zigzag`). There you may only re-link pointers (Lessons 05 and 07).

---

## 6. How `student.h` problems work

Each such folder contains:

```
main.cpp      <- the grader's test driver (they use their own copy; yours is just a sample)
vector.h      <- the CP container (do not modify; the grader uses its own)
student.h     <- YOU edit only this file
```

`main.cpp` does `#include "vector.h"` and then `#include "student.h"`. The class declares your function (for example `void erase_many(const std::vector<int> &pos);`) and you define it:

```cpp
#ifndef __STUDENT_H_
#define __STUDENT_H_

template <typename T>
void CP::vector<T>::erase_many(const std::vector<int> &pos) {
  // your code
}

#endif
```

There are two styles:

* **Out-of-class definition** (vector, queue, stack, priority_queue, map_bst): write `template <...> ReturnType CP::class<...>::name(params) { ... }`.
* **In-class body** (`CP::list` problems such as `d61_q2_splitlist` and `da67_m2_list_zigzag`): `list.h` contains `#include "student.h"` *inside* the class body, so your file holds a plain member function: `void splitList(list<T>& list1, list<T>& list2) { ... }`.

**Rules of the game:**

1. Submit only `student.h`. You may `#include <algorithm>`, `<vector>`, `<set>` and so on at the top unless the problem forbids it.
2. Do not change the function signature.
3. Read `main.cpp` to see **how your function is called and what is printed**. It is often the best "specification".
4. The grader tests time on large inputs, so respect the complexity the problem states ("must be O(n)", "must be O(h)", "must not be O(n²)").
5. Test locally:
   ```
   g++ -std=c++17 -O2 -Wall main.cpp -o main
   ./main < input.txt
   ```
   (In Code::Blocks, open the `.cbp` project and press Build & Run.)

---

## 7. Common traps

| Trap | Fix |
|---|---|
| `int` overflow in a sum or product | `long long`, `1LL*` |
| `endl` in a loop with 10⁵+ lines | `'\n'` |
| Reading 10⁶ numbers with plain `cin` | `sync_with_stdio(false)` |
| `size_t` loop counting down | use `int`, or `i-- > 0` |
| Global array too big for the stack | declare it global or `static`, or use `vector` |
| Deep recursion (> 10⁵) | iterative / explicit stack |
| Forgetting multiple test cases (`ex05m1_cycle` has T graphs) | reset all arrays per test |
| Off-by-one at the boundaries | test n = 0, n = 1, and the maximum n |

---

## 8. Exercises

1. A problem has n ≤ 2·10⁵. Which complexity should you aim for?
2. What is the complexity of this code?
   ```cpp
   for (int i = 1; i <= n; i *= 2)
     for (int j = 0; j < i; j++) cnt++;
   ```
3. Why is `long long x = a * b;` wrong when `a` and `b` are `int` with value 10⁵?
4. Solve T(n) = 3T(n/2) + n.
5. What is wrong with `for (size_t i = v.size() - 1; i >= 0; --i)`?
6. Estimate the memory of `int dist[5000][5000]`.

### Answers

1. O(n log n), possibly O(n√n). O(n²) = 4·10¹⁰ is far too slow.
2. The inner loop runs 1 + 2 + 4 + … + n < 2n times in total, so **O(n)**.
3. `a * b` is computed in `int` (10¹⁰ > 2.1·10⁹), overflows, *and then* is converted. Write `1LL * a * b`.
4. a = 3, b = 2, d = 1, and log₂3 ≈ 1.58 > 1, so Θ(n^1.585).
5. `size_t` is never negative, so the loop never ends, and if `v` is empty it starts at 2⁶⁴ − 1.
6. 25·10⁶ × 4 B = 100 MB.
