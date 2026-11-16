#ifndef __STUDENT_H_
#define __STUDENT_H_

// split(val): keys <  val stay in this tree,
//             keys >= val move to the returned tree.
// We walk ONE path from the root down (O(h)) and only re-link pointers:
// no node is created or deleted.
template <typename KeyT,
          typename MappedT,
          typename CompareT >
CP::map_bst<KeyT,MappedT,CompareT> CP::map_bst<KeyT,MappedT,CompareT>::split(KeyT val) {
  CP::map_bst<KeyT,MappedT,CompareT> result;

  node *lessRoot = NULL;   // root of the "< val" tree we are building
  node *lessLast = NULL;   // last node added to it; the next "<" piece hangs on its RIGHT
  node *geRoot   = NULL;   // root of the ">= val" tree we are building
  node *geLast   = NULL;   // last node added to it; the next ">=" piece hangs on its LEFT

  node *cur = mRoot;
  while (cur != NULL) {                     // one step down per loop -> at most h steps
    if (mLess(cur->data.first, val)) {
      // cur < val: cur AND its whole left subtree are < val -> they belong to "less".
      // Only cur's right subtree may still contain both kinds, so go right next.
      node *next = cur->right;
      if (lessLast == NULL) lessRoot = cur;          // first "<" node becomes the root
      else                  lessLast->right = cur;   // attach under the previous "<" node
      cur->parent = lessLast;                        // fix the upward pointer too
      lessLast = cur;
      cur = next;
    } else {
      // cur >= val: cur AND its whole right subtree are >= val -> they belong to "ge".
      // Only cur's left subtree may still contain both kinds, so go left next.
      node *next = cur->left;
      if (geLast == NULL) geRoot = cur;
      else                geLast->left = cur;
      cur->parent = geLast;
      geLast = cur;
      cur = next;
    }
  }
  // The open hooks still point at a subtree that went to the other side: cut them.
  if (lessLast != NULL) lessLast->right = NULL;
  if (geLast   != NULL) geLast->left    = NULL;

  mRoot = lessRoot;          // this tree keeps the "< val" part
  result.mRoot = geRoot;     // the returned tree gets the ">= val" part
  // The problem says sizes are not checked. Counting nodes would cost O(n), more than O(h),
  // so mSize is left as it was (result.mSize stays 0).
  return result;
}

#endif
