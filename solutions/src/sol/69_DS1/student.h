#ifndef __STUDENT_H_
#define __STUDENT_H_

// You may include library here
#include "map_bst.h"

// recursive1(n): number of LEVELS in the subtree rooted at n
// (empty -> 0, one node -> 1). The vector needs every slot of all these levels.
template <typename KeyT,
          typename MappedT,
          typename CompareT>
int CP::map_bst<KeyT, MappedT, CompareT>::recursive1(node* n) const
{
    if (n == NULL) return 0;
    int L = recursive1(n->left);
    int R = recursive1(n->right);
    return 1 + (L > R ? L : R);
}

// recursive2(n, i, v): node n belongs at heap index i.
// Write its key there, then send the children to 2i+1 (left) and 2i+2 (right).
template <typename KeyT,
          typename MappedT,
          typename CompareT>
void CP::map_bst<KeyT, MappedT, CompareT>::recursive2(node* n, std::size_t i, std::vector<KeyT>& v) const
{
    if (n == NULL) return;                 // empty spot: the slot keeps its 0
    v[i] = n->data.first;
    recursive2(n->left,  2 * i + 1, v);
    recursive2(n->right, 2 * i + 2, v);
}

template <typename KeyT,
          typename MappedT,
          typename CompareT>
std::vector<KeyT> CP::map_bst<KeyT, MappedT, CompareT>::flatten() const
{
    int levels = recursive1(mRoot);
    // a complete tree with `levels` levels has 2^levels - 1 slots (indices 0 .. 2^levels - 2)
    std::size_t slots = ((std::size_t)1 << levels) - 1;
    std::vector<KeyT> v(slots, KeyT());    // KeyT() = 0 for int: "no node here"
    recursive2(mRoot, 0, v);
    return v;
}

#endif
