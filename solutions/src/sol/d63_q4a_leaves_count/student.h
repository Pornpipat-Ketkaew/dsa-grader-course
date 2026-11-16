#ifndef __STUDENT_H_
#define __STUDENT_H_

#include <algorithm>
#include <iostream>

// you can modify and use this function
// Number of leaves in the subtree whose root is n.
template <typename KeyT,
          typename MappedT,
          typename CompareT>
size_t CP::map_bst<KeyT,MappedT,CompareT>::leaves_count(node* n) {
  if (n == NULL) return 0;                                  // empty subtree: no leaves
  if (n->left == NULL && n->right == NULL) return 1;        // n has no children: n IS a leaf
  return leaves_count(n->left) + leaves_count(n->right);    // otherwise: leaves are below n
}


template <typename KeyT,
          typename MappedT,
          typename CompareT>
size_t CP::map_bst<KeyT,MappedT,CompareT>::leaves_count() {
  return leaves_count(mRoot);                               // start the recursion at the root
}


#endif
