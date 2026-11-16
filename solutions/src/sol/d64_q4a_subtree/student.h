#ifndef __STUDENT_H__
#define __STUDENT_H__

#include <algorithm>
#include <vector>
#include "map_bst.h"

// process(n): count the nodes in the subtree rooted at n.
// Visits every node of that subtree exactly once -> O(size of the subtree).
template <typename KeyT,typename MappedT, typename CompareT >
size_t CP::map_bst<KeyT,MappedT,CompareT>::process(node* n) {
  if (n == NULL) return 0;                       // empty subtree has 0 nodes
  return 1 + process(n->left) + process(n->right);  // me + left side + right side
}

template <typename KeyT,typename MappedT, typename CompareT >
std::pair<KeyT,MappedT> CP::map_bst<KeyT,MappedT,CompareT>::subtree(map_bst<KeyT,MappedT,CompareT> &left, map_bst<KeyT,MappedT,CompareT> &right) {
  // empty tree: do nothing at all (left and right are NOT touched)
  if (mRoot == NULL) return std::pair<KeyT,MappedT>();

  // 1) throw away whatever left / right held before
  left.clear();
  right.clear();

  // 2) hand the two child subtrees over -- whole subtrees move, no node is copied,
  //    so their shape stays exactly the same
  node *L = mRoot->left;
  node *R = mRoot->right;
  left.mRoot = L;
  right.mRoot = R;

  // 3) each moved subtree root is now a real root: its parent must be NULL
  if (L != NULL) L->parent = NULL;
  if (R != NULL) R->parent = NULL;

  // 4) sizes: count the nodes we moved -> O(left.size() + right.size())
  left.mSize = process(L);
  right.mSize = process(R);

  // 5) this tree keeps only its root node
  mRoot->left = NULL;
  mRoot->right = NULL;
  mSize = 1;

  return mRoot->data;
}

#endif
