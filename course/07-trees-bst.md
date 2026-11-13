# Lesson 07: Binary Trees, Binary Search Trees and `CP::map_bst`

> **Goal:** think recursively about trees ("solve it for the left subtree, solve it for the right subtree, combine"), understand BST order and parent pointers, and know how to do surgery on a BST in O(h).

---

## 1. Why it matters

Problems: `d58_q3_unary`, `d59_q3_bst_split`, `d60_q3_same_tree`, `d61_q2_imbalance`, `d63_q4a_leaves_count`, `d64_q4a_subtree`, `da66_m1_tree_leaves_depth`, `da66_m2_furthest_distance`, `da67_m2_bst_parity_score`, `da67_m_bst_lca`, `ds04_best_bst`.

Recursion on trees (Lesson 11's ideas applied to trees) is also the basis of divide & conquer and of DFS on graphs.

---

## 2. Vocabulary

| Term | Meaning |
|---|---|
| root | the top node (no parent) |
| leaf | a node with **no children** |
| unary node | a node with **exactly one** child |
| depth(x) | number of edges from the root to x (the root has depth 0). **Some problems start at 1, so read carefully** (`da67_m_bst_lca` says the root is level 1) |
| height(x) | number of edges on the longest downward path from x to a leaf. A leaf has height 0, and the **empty tree has height −1** by convention (`d61_q2_imbalance` uses this) |
| subtree of x | x and all of its descendants |
| diameter | number of edges on the longest path between any two nodes (`da66_m2_furthest_distance`) |
| full / perfect / complete | full: every node has 0 or 2 children. Perfect: all leaves at the same depth (2^(h+1) − 1 nodes). Complete: the heap shape |

---

## 3. Binary search tree

**BST property:** for every node x, all keys in x's **left** subtree are < x.key, and all keys in its **right** subtree are > x.key (by the comparator `mLess`).

**Consequence:** an inorder traversal (left, node, right) visits the keys in sorted order.

### 3.1 `CP::map_bst` internals (from `map_bst.h`)

```cpp
class node {
    std::pair<KeyT,MappedT> data;   // data.first = key, data.second = value
    node *left, *right, *parent;
};
node    *mRoot;     // NULL if empty
CompareT mLess;
size_t   mSize;

// returns a REFERENCE to the pointer that should point to key k under parent
node* &child_link(node* parent, const KeyT& k) {
    if (parent == NULL) return mRoot;
    return mLess(k, parent->data.first) ? parent->left : parent->right;
}
node* find_node(const KeyT& k, node* r, node* &parent);   // standard BST walk
node* find_min_node(node* r);   // go left until NULL
node* find_max_node(node* r);   // go right until NULL
```

* **Search, insert and erase** are O(h), where h is the height: O(log n) if balanced, **O(n) if skewed** (for example, keys inserted in sorted order).
* **Erase with two children:** find the successor (the minimum of the right subtree), unlink it, and move its data into the node.
* **Iterator `++`:** if there is a right child, go to the minimum of the right subtree. Otherwise climb parents until you arrive from a left child.
* `end()` is `iterator(NULL)`.
* **Parent pointers must stay consistent.** `checkParent()` exists in the header because exams test it.

### 3.2 Comparing keys

Inside member functions, compare keys with `mLess(a, b)`, never with `<`. In the BST problems with `int` keys you *can* use `%` for parity (`da67_m2_bst_parity_score`) because the key type is concrete in `main`, but stay generic wherever you can.

---

## 4. The recursive template for trees

Almost every tree question is:

```
f(NULL)  = base value
f(node)  = combine( f(node->left), f(node->right), node )
```

Examples, each one line inside a recursive helper:

```cpp
// number of nodes
size_t count(node* n) { return n ? 1 + count(n->left) + count(n->right) : 0; }

// height (empty = -1)
int height(node* n) { return n ? 1 + std::max(height(n->left), height(n->right)) : -1; }

// number of leaves
size_t leaves(node* n) {
  if (!n) return 0;
  if (!n->left && !n->right) return 1;
  return leaves(n->left) + leaves(n->right);
}

// number of unary nodes (exactly one child)
size_t unary(node* n) {
  if (!n) return 0;
  bool one = (n->left == NULL) != (n->right == NULL);   // XOR
  return (one ? 1 : 0) + unary(n->left) + unary(n->right);
}
```

### 4.1 Passing information *down* (depth) vs returning information *up* (height)

* **Down:** add a parameter.
  ```cpp
  long long sum_leaf_depth(node* n, long long d) {
    if (!n) return 0;
    if (!n->left && !n->right) return d;
    return sum_leaf_depth(n->left, d + 1) + sum_leaf_depth(n->right, d + 1);
  }
  ```
  Parity score at depth ≤ d works the same way: pass the current depth, stop when it exceeds d, and add +1 for odd keys and −1 for even keys.
* **Up:** return a value (height, size).
* **Both, and a global best:** compute heights bottom-up, and at each node update an answer stored in a reference parameter. This is how you find the **diameter**:
  ```cpp
  // returns height; updates best = max over nodes of (hl + hr + 2)
  int h(node* n, int &best) {
    if (!n) return -1;
    int hl = h(n->left, best), hr = h(n->right, best);
    best = std::max(best, hl + hr + 2);     // longest path that bends at n
    return 1 + std::max(hl, hr);
  }
  ```
  (With an empty child the height is −1, so a single node gives −1 + −1 + 2 = 0 ✓.) The same pattern finds the **most imbalanced node** (`d61_q2_imbalance`): at each node compute |hl − hr| and keep the maximum, breaking ties by the smaller key as the statement requires.

### 4.2 Recursion depth warning

With n = 5·10⁵ keys inserted in sorted order, the tree is a chain of depth 5·10⁵. Recursive DFS may then **overflow the call stack** (a Runtime Error). Problems with N up to 5·10⁵ (`da66_m1_tree_leaves_depth`, `da67_m2_bst_parity_score`, `da67_m_bst_lca`) may contain such tests. A safe pattern is an iterative DFS with an explicit stack:

```cpp
std::vector<std::pair<node*, long long>> st;
if (mRoot) st.push_back({mRoot, 0});
long long sum = 0;
while (!st.empty()) {
    auto [n, d] = st.back(); st.pop_back();
    if (!n->left && !n->right) sum += d;
    if (n->left)  st.push_back({n->left,  d + 1});
    if (n->right) st.push_back({n->right, d + 1});
}
```

Recursion is fine when the expected trees are random or balanced. If you get a Runtime Error on big tests, switch to the iterative version.

---

## 5. Structural operations on a BST (re-linking, O(h))

### 5.1 Comparing two trees (`d60_q3_same_tree`)

```
same(a, b): if both NULL → true; if exactly one NULL → false;
            return a->data == b->data && same(a->left, b->left) && same(a->right, b->right)
```

The problem forbids using the STL here. Write a recursive helper inside the class, in the "You can also put your code here" area.

### 5.2 Lowest common ancestor (`da67_m_bst_lca`)

There are two classic methods:

1. **BST walk (O(h)):** start at the root. If both keys are less than the current key, go left; if both are greater, go right; otherwise the current node is the LCA. (If one of them *is* the current node, it's the LCA, because a node is its own ancestor in this problem.)
2. **Parent pointers (O(h)):** compute depth(p) and depth(q) by climbing to the root, lift the deeper one until both depths are equal, then climb both together until they meet.

The function is `const`, which is fine since both methods only read.

### 5.3 Split by key (`d59_q3_bst_split`): O(h), no new nodes

Goal: `this` keeps the keys < val, and the result gets the keys ≥ val.

Think recursively about the root r:

* If r.key ≥ val, then r *and its whole right subtree* belong to the result. Its left subtree must itself be split: the keys < val stay with `this`, and the keys ≥ val become r's new left subtree.
* If r.key < val, then r and its left subtree stay. Split the right subtree: its keys ≥ val go to the result, and the rest become r's new right subtree.

Each step goes down one level, so this is O(h). Afterwards:

* fix the **parent pointers** of every re-attached subtree root (and set the new roots' parent to NULL),
* fix **mSize** in both trees. Counting the moved nodes is O(size). Check the statement for the required complexity; maintaining sizes may force you to count one side.

You can also do it iteratively, with two "hooks" (`node* &` references: where to attach the next < val piece and where to attach the next ≥ val piece) while walking down. That is exactly the way `child_link` returns `node*&`.

### 5.4 Moving subtrees between trees (`d64_q4a_subtree`)

The task: move the root's left subtree into `left` and the right subtree into `right`, after **deleting** their old contents (`clear()`); set each moved subtree root's `parent = NULL`; set the sizes (count the nodes with a helper such as `process(node*)`); detach the moved subtrees from the root (`mRoot->left = mRoot->right = NULL`, `mSize = 1`); and return the root's data. If the tree is empty, return `pair<KeyT,MappedT>()` and do nothing. **Edge case:** `left` or `right` might be the same object as `*this`. Read whether the statement excludes that.

### 5.5 Building a perfect BST (`ds04_best_bst`)

Insert the keys 1..2^k − 1 so that the height is k − 1. Insert the **median first**, then recursively the medians of the left and right halves (a preorder of the balanced tree):

```cpp
void build(int lo, int hi, CP::map<int,int>& bst) {
    if (lo > hi) return;
    int mid = (lo + hi) / 2;
    bst[mid] = 0;            // insert mid
    build(lo, mid - 1, bst);
    build(mid + 1, hi, bst);
}
```

---

## 6. Complexity

| Operation | Balanced | Skewed |
|---|---|---|
| find / insert / erase | O(log n) | O(n) |
| full traversal (count, height, leaves, diameter) | O(n) | O(n) |
| split by key, LCA | O(h) | O(n) |

---

## 7. Common traps

1. Height conventions: −1 for empty vs 0 for empty. Use exactly what the statement says.
2. Depth starting at 0 vs 1.
3. **Forgetting parent pointers** after re-linking (the grader may call `checkParent`).
4. Forgetting `mSize`.
5. Stack overflow on skewed trees (§4.2).
6. Ties: "if several nodes have the same imbalance, return the smallest key". Compare with `mLess`.
7. Returning the wrong thing for an empty tree (−1 for the diameter of an empty tree in `da66_m2_furthest_distance`).

---

## 8. Grader problems for this lesson

| Problem | Task | Key idea |
|---|---|---|
| `d63_q4a_leaves_count` | count leaves | §4 |
| `d58_q3_unary` | count nodes with exactly one child | §4 (XOR) |
| `d60_q3_same_tree` | structural equality | §5.1 |
| `da66_m1_tree_leaves_depth` | sum of the depths of all leaves (long long) | §4.1 down, §4.2 depth |
| `da67_m2_bst_parity_score` | #odd − #even keys at depth ≤ d | §4.1 down; prune below d |
| `d61_q2_imbalance` | value of the most imbalanced node | §4.1 height + global best |
| `da66_m2_furthest_distance` | diameter in edges | §4.1 |
| `da67_m_bst_lca` | lowest common ancestor | §5.2 |
| `ds04_best_bst` | insertion order giving a perfect BST | §5.5 |
| `d64_q4a_subtree` | move the root's subtrees to other trees | §5.4 |
| `d59_q3_bst_split` | split by key in O(h) | §5.3 |

---

## 9. Exercises

1. Insert 5, 3, 8, 1, 4, 7, 9, 2 into an empty BST. Draw it, then give its height, number of leaves, number of unary nodes and diameter.
2. What is the LCA of 2 and 4 in that tree? Of 7 and 9? Of 3 and 2?
3. Split it at val = 5. What do the two trees look like?
4. Write `bool is_bst(node* n, const KeyT* lo, const KeyT* hi)`.
5. Why is inserting 1..n in increasing order bad for a plain BST?

### Answers

1. 5 is the root; its left child is 3 (children 1 and 4, and 1 has the right child 2); its right child is 8 (children 7 and 9). Height = 3 (5→3→1→2). Leaves: 2, 4, 7, 9, so **4**. Unary nodes: only 1, so **1**. Diameter: 2→1→3→5→8→9 = **5** edges.
2. LCA(2,4) = 3, LCA(7,9) = 8, LCA(3,2) = 3.
3. Keys < 5: {1,2,3,4} (root 3: left 1 with right child 2, right 4). Keys ≥ 5: {5,7,8,9} (root 5 with right child 8, which has children 7 and 9).
4. If n is NULL return true; if lo and n.key ≤ *lo, or hi and n.key ≥ *hi, return false; otherwise recurse left with (lo, &key) and right with (&key, hi).
5. Every node becomes a right child, so the tree is a chain of height n−1, and every operation becomes O(n).
