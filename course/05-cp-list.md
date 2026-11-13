# Lesson 05: Linked Lists (`CP::list`, a Circular Doubly Linked List with a Header)

> **Goal:** become fluent at **pointer surgery**: moving, splitting, merging and repairing nodes in O(1) per node *without* creating or deleting nodes.

---

## 1. Why it matters

Problems: `d57_q3_shift`, `d58_q3_list_replace`, `d61_q2_splitlist`, `d64_q4a_list_merge`, `da67_m2_list_zigzag`, `da68_m_list_wrog_prev`, `ds04_playlist`.

Several of them say **"you must not create new nodes, directly or indirectly (no `new`, `insert`, `push_back`), or you get 0"**. You can only re-link existing nodes.

---

## 2. Theory

### 2.1 Structure

```cpp
class node {
  public:
    T data;
    node *prev;
    node *next;
    node() : data(T()), prev(this), next(this) {}          // a lone node points to itself
    node(const T& d, node* p, node* n) : data(d), prev(p), next(n) {}
};
node  *mHeader;   // sentinel node: holds no data
size_t mSize;
```

Picture of `{A, B, C}`:

```
      ┌──────────────────────────────────────────────┐
      ▼                                              │
  [Header] ⇄ [A] ⇄ [B] ⇄ [C] ⇄ (back to Header) ─────┘
  begin() = mHeader->next  (A)
  end()   = mHeader        (the sentinel itself)
  front   = mHeader->next->data
  back    = mHeader->prev->data
  empty list: mHeader->next == mHeader->prev == mHeader
```

**Why a sentinel?** Every real node always has a real `prev` and `next` (possibly the header), so there are **no NULL checks and no special cases** for inserting at the front, at the back, or into an empty list. That is the whole point.

**Invariants** you must restore before your function returns:

1. For every node x (including the header): `x->next->prev == x` and `x->prev->next == x`.
2. Walking `next` from the header visits exactly `mSize` real nodes and returns to the header.
3. `mSize` is correct for **every** list you touched (this one, `list1`, `list2`, `ls`, …).

### 2.2 The four primitive operations

**Link a node n between a and b** (where `a->next == b`):

```cpp
n->prev = a;  n->next = b;
a->next = n;  b->prev = n;
```

**Unlink node n** (without deleting it):

```cpp
n->prev->next = n->next;
n->next->prev = n->prev;
```

**Splice a whole chain** `[first .. last]` (already detached, with internal links intact) between a and b:

```cpp
a->next = first;  first->prev = a;
last->next = b;   b->prev = last;
```

**Make a list empty** (its nodes now belong to someone else):

```cpp
mHeader->next = mHeader->prev = mHeader;
mSize = 0;
```

> **Rule:** save every pointer you will need *before* overwriting anything. Draw the "before" and "after" pictures, then write one assignment per arrow that changes.

### 2.3 Accessing another list's internals

Inside `CP::list<T>`, you can access `other.mHeader` and `other.mSize` of **any** `list<T>` object, because access control is per *class*, not per object. In `merge(CP::list<CP::list<T>>& ls)`, the elements of `ls` are `list<T>` objects. Iterate them with `ls`'s iterator, and for each element `L` use `L.mHeader` and `L.mSize` directly. (`*it` gives a `list<T>&`.)

### 2.4 Example: moving all nodes of `other` to the end of `this` in O(1)

```cpp
void append_all(list<T>& other) {
  if (other.mSize == 0) return;
  node *first = other.mHeader->next;
  node *last  = other.mHeader->prev;
  node *tail  = mHeader->prev;
  // splice [first..last] between tail and mHeader
  tail->next = first;   first->prev = tail;
  last->next = mHeader; mHeader->prev = last;
  mSize += other.mSize;
  // empty the other list
  other.mHeader->next = other.mHeader->prev = other.mHeader;
  other.mSize = 0;
}
```

This is exactly the building block for `d64_q4a_list_merge` (call it for each list in `ls`, which is O(ls.size()) in total).

### 2.5 Example: rotating by moving the header

In a circular list, "shift left by k" (the first k elements go to the end) does not require moving data. **Move the header node** instead:

1. Reduce k: `k %= n` (and handle negative k: `k = ((k % n) + n) % n`). If n = 0, do nothing.
2. Find the node `p` that will be the new last element. This is the k-th real node (1-indexed), so walk k steps from the header.
3. Unlink the header, and re-link it between `p` and `p->next`.

This is O(min(k, n−k)) if you walk in the shorter direction, with no data copying. That is the idea behind `d57_q3_shift`.

### 2.6 Example: splitting a list in half (`d61_q2_splitlist`)

* Let n = mSize, and let the first half have ⌈n/2⌉ = (n + 1) / 2 nodes.
* Walk to the last node of the first half, `m`.
* Chain 1 is `[mHeader->next .. m]` and chain 2 is `[m->next .. mHeader->prev]` (it may be empty).
* Splice chain 1 onto the **end** of `list1` (which may already contain data!) and chain 2 onto the end of `list2`, update both sizes, and empty `*this`.
* Edge cases: n = 0, n = 1 (chain 2 is empty), and list1 or list2 not empty initially.

### 2.7 Example: repairing prev pointers (`da68_m_list_wrog_prev`)

All `next` pointers are correct, but some `prev` pointers are wrong. Walk from the header along `next`. For each node x, the correct value is `x->next->prev == x`, so:

```cpp
node *cur = mHeader;
do {
    node *nx = cur->next;
    if (nx->prev != cur) { nx->prev = cur; count++; }
    cur = nx;
} while (cur != mHeader);
```

This fixes the header's prev too (the last step checks `mHeader->prev`). Whether the header counts as a "node that needed fixing" is something to confirm from the examples. The memory limit is 32 MB, so use no extra arrays.

---

## 3. Complexity

| Operation | Time |
|---|---|
| insert or erase at an iterator | O(1) |
| splice a chain whose ends you know | O(1) |
| find the k-th node | O(k) |
| `size()` | O(1) (stored in mSize) |

---

## 4. Common traps

1. **Forgetting `mSize`** of one of the lists. The grader's `main.cpp` usually prints sizes.
2. **Losing a pointer** because you overwrote `a->next` before saving it.
3. **Empty lists**: `mHeader->next == mHeader`. A chain "from first to last" doesn't exist, so skip the operation.
4. **Leaving the moved-from list in a broken state**: its header must point to itself.
5. **Creating nodes** when forbidden: `push_back`, `insert` and the copy constructor all create nodes.
6. **Iterating while modifying**: save `next` before you move the current node.
7. **`replace(x, y)`** (`d58_q3_list_replace`): here you *may* create nodes (each x becomes a **copy** of y's elements, and y must remain unchanged). Use `insert(it, value)` for every element of y before the x node, then `erase` the x node. Careful: if y contains x, don't re-process the new nodes. Collect the positions first, or advance past the inserted nodes.

---

## 5. Grader problems for this lesson

| Problem | Task | Key idea |
|---|---|---|
| `da68_m_list_wrog_prev` | fix wrong prev pointers, return the count | 2.7 |
| `d58_q3_list_replace` | replace each x by a copy of list y | trap 7 |
| `d57_q3_shift` | circular shift by k (left if positive, right if negative) without insert/erase | 2.5 (move the header) |
| `d64_q4a_list_merge` | append all lists in ls in O(ls.size()) | 2.4 for each list |
| `d61_q2_splitlist` | split into list1 (first ⌈n/2⌉) and list2, no new nodes | 2.6 |
| `da67_m2_list_zigzag` | interleave the nodes of ls into this list: this₁, ls₁, this₂, ls₂, …, then leftovers | walk both lists, re-link each ls node after the current node, fix sizes, empty ls |
| `ds04_playlist` | `reorder(pos, selected)`: move the selected positions to position pos | first collect `node*` for the selected indices and for the anchor node at pos (all in one pass, *before* moving anything), unlink the selected nodes, then link them in order before the anchor. Read the statement for how pos is defined when the anchor itself is selected |

---

## 6. Exercises

1. Draw the list `{1,2,3}` with its header, and write the 4 assignments that insert 9 between 1 and 2.
2. Write `void reverse()` for CP::list in O(n) by swapping `prev` and `next` in every node *including the header*. Why does that work?
3. Write `void move_to_front(iterator it)` in O(1).
4. What is wrong with this code?
   ```cpp
   node *a = mHeader->next;
   mHeader->next = a->next;
   a->next->prev = mHeader;
   delete a;           // in a problem that forbids deleting nodes
   ```

### Answers

1. With n = the new node, a = node(1), b = node(2): `n->prev=a; n->next=b; a->next=n; b->prev=n;`
2. Swapping in every node reverses every arrow, and since the header is a node of the cycle, the cycle is now traversed backwards from the header. So begin() becomes the old last element. Code: `node* p = mHeader; do { std::swap(p->prev, p->next); p = p->prev; } while (p != mHeader);` (after the swap, the old next is `p->prev`).
3. `node *n = it.ptr; n->prev->next = n->next; n->next->prev = n->prev; n->prev = mHeader; n->next = mHeader->next; mHeader->next->prev = n; mHeader->next = n;`
4. It deletes a node (forbidden in some problems), and it doesn't update `mSize`.
