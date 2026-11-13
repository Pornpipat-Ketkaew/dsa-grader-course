# Lesson 02: The C++ Standard Template Library (STL)

> **Goal:** know every STL container's operations, *their complexity*, and when to choose each one. Full-program problems in this folder are mostly "pick the right container and algorithm".

---

## 1. Why it matters

* `da66_m2_change_data` tests whether you can manipulate `stack<vector<queue<int>>>`, `map<string, pair<priority_queue<int>, int>>` and `set<pair<list<int>, map<…>>>`. That means knowing *every* container's interface.
* `d62_q1a_vote`, `d62_q1b_grandfather`, `d61_q1_ordered_set`, `da66_m1_line_monopoly`, `da68_m_count_value` and `d63_q1a_hiatus` are solved almost entirely with `map`, `set`, `unordered_map`, `sort` and `lower_bound`.
* Lessons 03 to 07 *re-implement* these containers, so you must first understand their behaviour from the outside.

---

## 2. Container overview

| Container | Underlying structure | Access | Insert/erase | Find | Ordered? |
|---|---|---|---|---|---|
| `vector<T>` | dynamic array | `v[i]` O(1) | back: amortized O(1); middle: O(n) | O(n) | insertion order |
| `deque<T>` | blocks of arrays | `d[i]` O(1) | front/back O(1) | O(n) | insertion order |
| `list<T>` | doubly linked list | no `[]` | O(1) at a known iterator | O(n) | insertion order |
| `stack<T>` | adapter over deque | `top()` | push/pop O(1) | none | LIFO |
| `queue<T>` | adapter over deque | `front()/back()` | push back / pop front O(1) | none | FIFO |
| `priority_queue<T>` | binary heap in a vector | `top()` = max | push/pop O(log n) | none | heap |
| `set<T>` / `map<K,V>` | red-black tree | none | O(log n) | O(log n) | **sorted** |
| `multiset`/`multimap` | red-black tree | | O(log n) | O(log n) | sorted, duplicates allowed |
| `unordered_set/map` | hash table | | average O(1) | average O(1) | none |

---

## 3. `vector`

```cpp
vector<int> v;                 // empty
vector<int> a(n);              // n zeros
vector<int> b(n, -1);          // n copies of -1
vector<vector<int>> g(n, vector<int>(m, 0));  // n x m table

v.push_back(x); v.pop_back();
v.back(); v.front(); v.size(); v.empty(); v.clear();
v.insert(v.begin() + pos, x);            // O(n): shifts the tail right
v.insert(v.begin() + pos, cnt, x);       // inserts cnt copies, O(n + cnt), see d63_q1a_multi_insert
v.insert(v.begin() + pos, w.begin(), w.end());   // insert a range
v.erase(v.begin() + pos);                // O(n)
v.erase(v.begin() + l, v.begin() + r);   // erase [l, r)
v.resize(k); v.reserve(k);
reverse(v.begin(), v.end());
```

**Iterator invalidation:** after `insert` or `push_back` causes reallocation, *every* iterator, pointer and reference into the vector becomes invalid. After `erase`, iterators at or after the erased point are invalid.

---

## 4. `pair` and `tuple`

```cpp
pair<int,string> p = {3, "x"};
p.first; p.second;
auto [a, b] = p;               // C++17 structured binding
```

Pairs compare **lexicographically**: first by `.first`, and only if equal by `.second`. This is exactly what `d63_q2a_pair_gte` asks you to implement by hand. Sorting a `vector<pair<…>>` therefore sorts by first, then second, which is a very common trick:

```cpp
vector<pair<int,int>> iv;      // (finish, start)
sort(iv.begin(), iv.end());    // sorted by finish time, then by start
```

---

## 5. `stack`, `queue`, `priority_queue`

```cpp
stack<int> s;  s.push(1); s.top(); s.pop(); s.size(); s.empty();
queue<int> q;  q.push(1); q.front(); q.back(); q.pop();

priority_queue<int> mx;                              // max-heap: top() is the largest
priority_queue<int, vector<int>, greater<int>> mn;   // min-heap: top() is the smallest
mx.push(5); mx.top(); mx.pop();
```

Important facts:

* `pop()` returns **void**. Read `top()` or `front()` first.
* You **cannot iterate** a stack, queue or priority_queue, and you cannot change an element inside one. To "modify" one (`da66_m2_change_data`), pop everything into a temporary, change it, and push it back.
* Custom ordering for a priority_queue: the comparator says when `a` has *lower* priority than `b`. The element for which the comparator is "largest" ends up on top.

```cpp
struct Cmp {
    bool operator()(const pair<int,int>& a, const pair<int,int>& b) const {
        return a.first > b.first;          // smaller .first means higher priority
    }
};
priority_queue<pair<int,int>, vector<pair<int,int>>, Cmp> pq;   // min-heap by .first
```

Dijkstra almost always uses `priority_queue<pair<long long,int>, vector<…>, greater<…>>` holding (distance, vertex).

---

## 6. `set` / `multiset`

```cpp
set<int> s;
s.insert(5);  s.erase(5);  s.count(5);  s.find(5) != s.end();
s.size(); s.begin(); prev(s.end());          // min and max
auto it = s.lower_bound(x);   // first element >= x
auto jt = s.upper_bound(x);   // first element >  x
// largest element <= x:
auto kt = s.upper_bound(x);
if (kt != s.begin()) { --kt; /* *kt is the answer */ }

for (int x : s) ...           // iterates in sorted order
```

* Elements of a `set` are **const**. You cannot change them in place: erase and re-insert. (`da66_m2_change_data` has a `set<pair<list<int>, map<…>>>` where you must remove the element, modify a copy, and insert it again.)
* `multiset::erase(x)` removes **all** copies of x. To remove one copy, use `ms.erase(ms.find(x))`.

## 7. `map` / `multimap`

```cpp
map<string,int> cnt;
cnt["alice"]++;                  // operator[] inserts a default value (0) if the key is missing
cnt.count("bob");                // 0 or 1, and does NOT insert
auto it = cnt.find("bob");       // end() if absent
for (auto &[name, c] : cnt) ...  // sorted by key
cnt.erase("alice");
cnt.lower_bound(key); cnt.upper_bound(key);
```

**Trap:** `if (m[x] == 0)` *creates* key x. To test membership use `count` or `find`.

**Map as an interval structure** (`da66_m1_line_monopoly`): keep `map<int,int> seg` with start → end for disjoint intervals. Insert [l, r] by finding the neighbours with `lower_bound`, merging every overlapping or touching interval, and erasing them. Each interval is inserted once and erased at most once, so the total cost is O(n log n).

## 8. `unordered_map` / `unordered_set`

Average O(1), worst case O(n). Use it when you don't need order and the keys are many (`d62_q1b_grandfather`: 10⁶ ids up to 10¹³).

```cpp
unordered_map<long long, long long> par;
par.reserve(1 << 21);      // pre-size to avoid rehashing (a big speed-up)
par[son] = father;
```

---

## 9. `<algorithm>`: the functions you must know

```cpp
sort(v.begin(), v.end());                          // O(n log n), ascending
sort(v.begin(), v.end(), greater<int>());          // descending
sort(v.begin(), v.end(), [](const T& a, const T& b){ return a.x < b.x; });
stable_sort(...);                                  // keeps the order of equal elements

// on a SORTED range:
lower_bound(v.begin(), v.end(), x);   // iterator to the first element >= x
upper_bound(v.begin(), v.end(), x);   // iterator to the first element >  x
binary_search(v.begin(), v.end(), x); // bool
// count of x in sorted v:  upper_bound(x) - lower_bound(x)
// count of values in [A,B]: upper_bound(B) - lower_bound(A)      (da68_m_count_value, d63_q1b_interval_count)

unique(v.begin(), v.end());           // removes ADJACENT duplicates, returns the new end
v.erase(unique(v.begin(), v.end()), v.end());   // sort + unique = distinct values

nth_element(v.begin(), v.begin()+k, v.end());   // average O(n): puts the k-th smallest at position k
                                                // (da68_m2_vector_range_aggregate: median)
reverse, swap, min, max, min_element, max_element, accumulate (in <numeric>),
next_permutation(v.begin(), v.end());           // the next lexicographic permutation
fill(v.begin(), v.end(), 0);
iota(v.begin(), v.end(), 0);                    // 0,1,2,... (<numeric>)
```

### Lambdas

```cpp
auto cmp = [&](int a, int b) { return score[a] > score[b]; };
sort(idx.begin(), idx.end(), cmp);
```

The `[&]` captures surrounding variables by reference.

---

## 10. Choosing a container: a decision guide

* Need "is x present?" or counts, with no order: **unordered_map/set** (or a plain array if keys ≤ 10⁷).
* Need sorted order, predecessor/successor, or range queries with updates: **set/map**.
* Data never changes after reading, with many queries: **sort the vector once + `lower_bound`**. This is faster and simpler than a set.
* Need the current max/min repeatedly while inserting: **priority_queue**.
* Need FIFO (BFS): **queue**. LIFO (DFS, undo): **stack** or recursion.
* Frequent insertion in the middle at known positions: **list** (O(1) splice).

---

## 11. Grader problems for this lesson

| Problem | Hint |
|---|---|
| `ex00e3` Check Mapping | A permutation of 1..N means each value lies in [1, N] and none repeats. Use a `vector<bool> seen(N+1)`. Values can be −2·10⁹, so check the range *before* indexing. |
| `d62_q1a_vote` | `map<string,int>` counts. Collect the counts, sort them descending, and the answer is the count at position min(K, #candidates) − 1. Read the statement for how ties are handled. |
| `d62_q1b_grandfather` | `unordered_map<long long,long long> father`. grandfather(A) = father[father[A]]. Both must exist, A ≠ B, and they must be equal. |
| `d61_q1_ordered_set` | Union and intersection of two sequences, keeping the order the statement specifies. Use a `set`/`unordered_set` to check membership; never use nested loops (n = 10⁵). |
| `da68_m_count_value` | Copy the map's *values* to a vector, sort, then `upper_bound(B) - lower_bound(A)` per query. |
| `d63_q1a_multi_insert` | Insert `count` copies at `pos`. `v.insert(it, count, value)` is O(n + count), while a loop of single inserts is O(n·count), which means TLE. |
| `da66_m2_change_data` | For each nested container, learn how to reach the element: stack: pop into a temp; priority_queue: pop all, change, re-push; set element: erase, modify a copy, insert; map key: erase and insert under the new key. |

---

## 12. Exercises

1. Which is faster for 10⁶ lookups of keys up to 10¹³: `map` or `unordered_map`? Why might you still choose `map`?
2. Write code that prints the number of distinct values in a vector of n ints in O(n log n).
3. What does `m[x]` do when x is not in the map? Why can this be a bug?
4. Given a sorted vector `v`, how do you find the *largest element ≤ x*, or report that none exists?
5. How do you make a `priority_queue<int>` give the smallest element first?

### Answers

1. `unordered_map` (average O(1) vs O(log n)). You might choose `map` when you need sorted iteration or lower_bound, or to avoid worst-case hash collisions.
2. `sort(v.begin(), v.end()); int d = unique(v.begin(), v.end()) - v.begin();`
3. It inserts x with a value-initialised mapped value (0 or ""), which changes `size()` and the iteration.
4. `auto it = upper_bound(v.begin(), v.end(), x); if (it == v.begin()) none; else answer = *prev(it);`
5. `priority_queue<int, vector<int>, greater<int>>`, or push `-x` and negate when you pop.
