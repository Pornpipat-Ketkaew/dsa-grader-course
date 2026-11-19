#include "priority_queue.h"
#include <utility>

template <typename T,typename Comp>
void CP::priority_queue<T, Comp>::child_swap(size_t k) {
  // The tree is FULL (mSize = 2^a - 1), so below node k the left subtree and
  // the right subtree have exactly the same shape. Level by level, each
  // subtree's nodes sit in one contiguous block of the array, and the right
  // block starts right after the left block ends:
  //
  //   depth 1 below k:  left block [2k+1]            right block [2k+2]
  //   depth 2 below k:  left block [4k+3 .. 4k+4]    right block [4k+5 .. 4k+6]
  //   ...
  // A block that starts at l with width w has its children block starting at
  // 2l+1 with width 2w. Swapping the two subtrees = swapping the two blocks
  // on every level, element by element (position j with position j + w).
  size_t l = 2 * k + 1;   // first index of the left block on this level
  size_t w = 1;           // width of each block on this level

  // One pass per level below k; stop when the left block falls off the
  // array (k was a leaf, or we passed the deepest level).
  while (l < mSize) {
    // j visits l, l+1, ..., l+w-1 (left to right): every node of the left
    // block on this level; its partner in the right block is j + w.
    for (size_t j = l; j < l + w; j++) {
      std::swap(mData[j], mData[j + w]);
    }
    l = 2 * l + 1;        // leftmost child of the leftmost node
    w = 2 * w;            // each level has twice as many nodes
  }
}
