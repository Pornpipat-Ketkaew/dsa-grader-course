#ifndef __STUDENT_H__
#define __STUDENT_H__

// process(ptr): number of unary nodes (exactly one child) in the subtree rooted at ptr.
// Visits each node of that subtree once. It is const: it only reads the tree.
template <typename KeyT,
          typename MappedT,
          typename CompareT>
size_t CP::map_bst<KeyT,MappedT,CompareT>::process(node* ptr) const {
  if (ptr == NULL) return 0;                                   // empty subtree: nothing to count
  bool hasLeft  = (ptr->left  != NULL);
  bool hasRight = (ptr->right != NULL);
  size_t me = (hasLeft != hasRight) ? 1 : 0;                   // exactly one child <=> the two flags differ
  return me + process(ptr->left) + process(ptr->right);        // me + unary nodes below me
}

template <typename KeyT,
          typename MappedT,
          typename CompareT>
size_t CP::map_bst<KeyT,MappedT,CompareT>::count_unary() const {
  return process(mRoot);                                       // empty tree: process(NULL) = 0
}

#endif
