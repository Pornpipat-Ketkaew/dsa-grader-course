#ifndef __STUDENT_H_
#define __STUDENT_H_

#include "map_bst.h"

// my_recur(n, aux): sum of the depths of all leaves in the subtree rooted at n,
// where aux = the depth of n itself in the WHOLE tree (passed DOWN from the parent).
template <typename KeyT, typename MappedT, typename CompareT>
long long CP::map_bst<KeyT, MappedT, CompareT>::my_recur(node* n, size_t aux) {
  if (n == NULL) return 0;                                   // no node, no leaf
  if (n->left == NULL && n->right == NULL) return aux;       // a leaf contributes its own depth
  // children are one level deeper than n
  return my_recur(n->left, aux + 1) + my_recur(n->right, aux + 1);
}

template <typename KeyT, typename MappedT, typename CompareT>
long long CP::map_bst<KeyT, MappedT, CompareT>::sum_leaves_depth() {
  return my_recur(mRoot, 0);                                 // the root has depth 0
}

#endif
