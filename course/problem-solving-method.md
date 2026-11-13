# How to Attack Any Grader Problem: Method and Checklists

> Read this after Lesson 01, and again before every exam.

---

## 1. The 7-step method

### Step 1: Read the problem twice, and the samples three times

* What is the **input** exactly (format, 0- or 1-indexed, multiple test cases)?
* What is the **output** exactly (one number? a list? "-1" when impossible? spacing)?
* Work through **every sample by hand**. If your understanding doesn't reproduce a sample, you have misunderstood the problem.
* For `student.h` problems, read `main.cpp`: how is your function called, and what is printed afterwards?

### Step 2: Restate the problem in one sentence, mathematically

Remove the story. "The hacker spreads through servers" becomes "multi-source shortest path with vertex weights; output the maximum distance". "Mr. Dae saves money" becomes "a prefix-sum array plus `lower_bound`".

### Step 3: Read the constraints, then guess the complexity (Lesson 01 table)

| n | target |
|---|---|
| ≤ 12 | n!, backtracking |
| ≤ 20 | 2ⁿ, subsets, bitmask |
| ≤ 500 | n³ |
| ≤ 5000 | n² |
| ≤ 10⁶ | n log n or n |
| ≤ 10⁹ or more | log n, math, binary search on the answer |

Also check: do the values need **`long long`**? Is there a **mod**? Is there a **memory** limit (32 MB? 128 MB?)?

### Step 4: Match the problem to a pattern

| Phrase in the problem | Think of |
|---|---|
| "print all …", tiny n | backtracking (L11) |
| "number of ways … mod 100000007" | counting DP (L14, L15) |
| "minimum/maximum … subject to …", choices interact | DP (L14), or greedy if an exchange argument works (L13) |
| "sorted", "queries", "largest ≤", "first time when" | binary search (L08) |
| "sum of a range", many queries | prefix sums (L08) |
| intervals, coordinates up to 10⁹ | sorting + sweep line (L10) |
| a recursive definition (size 2ᵏ built from 2ᵏ⁻¹) | divide & conquer (L12) |
| grid, spreading, "within distance" | BFS / multi-source BFS (L16) |
| connected, components, cycle | DFS / BFS / DSU (L16, L18) |
| minimum cost path, non-negative weights | Dijkstra (L17) |
| negative weights, "infinite profit" | Bellman-Ford (L17) |
| connect everything cheaply | MST (L18) |
| add a function to a CP container | the internals lessons (L03–L07): draw the memory layout first |

### Step 5: Design on paper before coding

* Write the state or invariant in words.
* Write the recurrence or the loop.
* Check it on the samples by hand.
* Think about the edge cases: n = 0, n = 1, everything equal, the maximum n, negative numbers, an empty container, an unreachable target.

### Step 6: Code simply

* Use clear names and small helper functions.
* Use the templates you have practised (BFS, Dijkstra, DSU, binary search).
* Use fast I/O for big inputs.

### Step 7: Test

* Run the samples.
* Make a tiny random test and compare with a brute force (when it's easy to write).
* Make a maximum-size test to check the speed.

---

## 2. Debugging checklist by verdict

### Wrong Answer

* [ ] Overflow? Use `long long` everywhere suspicious.
* [ ] Output format: spaces, newlines, "-1" cases, the order of the output.
* [ ] 0- vs 1-indexing.
* [ ] Multiple test cases: did you reset the global arrays?
* [ ] Inclusive vs exclusive ranges.
* [ ] Ties: what does the statement say?
* [ ] For `student.h`: did you update `mSize`, `mCap`, `mFront`, the parent pointers, and *every* list you touched?
* [ ] For heaps and BSTs: did you use `mLess` instead of `<`?

### Time Limit Exceeded

* [ ] The complexity is too high for the constraints?
* [ ] Slow I/O (`cin` without sync, `endl`)?
* [ ] A repeated O(n) operation inside a loop (vector insert/erase, `std::lower_bound` on a set, copying containers by value)?
* [ ] Recursion without memoisation?
* [ ] An infinite loop (binary search `lo = mid`, an unsigned countdown)?

### Runtime Error

* [ ] An array index out of bounds (check `r < R`, `c < C`, `idx < mSize`)?
* [ ] Dereferencing NULL (empty tree, empty list, `end()`)?
* [ ] Stack overflow from deep recursion (switch to iterative)?
* [ ] Division or modulo by zero (`% mCap` when mCap = 0, `k %= n` when n = 0)?
* [ ] Using freed memory (an iterator after reallocation)?

### Memory Limit Exceeded

* [ ] A 2-D table too large? Roll the arrays, or use `char`/`bool`/`short`.
* [ ] Storing every solution when you could print as you go?
* [ ] Leaks: `new` without `delete[]` in a loop?

---

## 3. The format for asking me about a problem

When you type a problem's name in the chat (for example **`d64_q3a_heap_kth`**), I will answer in this order:

1. **What the problem says**: a faithful restatement (translated from the Thai where needed), with the inputs, outputs and constraints.
2. **What it actually means**: the problem with the story removed, as a precise mathematical or data-structure question, plus observations from the samples.
3. **What, why and how**:
   * *What* we need to compute or implement,
   * *Why* the naive idea fails (complexity, a trap) and why the right idea works (an invariant, an exchange argument, a recurrence),
   * *How* to do it, step by step.
4. **The algorithm**: pseudocode or C++, its complexity, and the edge cases.
5. **The knowledge behind it**: the course lesson and the concepts it relies on, so you can solve similar problems yourself.

You can also ask: *"give me only a hint"*, *"check my code"* (paste it), or *"explain sample 2 step by step"*.
