#ifndef __STUDENT_H_
#define __STUDENT_H_

#include "map_bst.h"

// my_recur(n, aux):
//   returns  the number of NODES on the longest downward path starting at n
//            (NULL -> 0, a leaf -> 1)  -- this is "height + 1"
//   updates  aux = the longest distance (in EDGES) seen so far between any two nodes.
// The longest path whose highest node is n goes down the deepest path on the left
// and the deepest path on the right: it has  left + right  edges.
template <typename KeyT,
          typename MappedT,
          typename CompareT>
int CP::map_bst<KeyT, MappedT, CompareT>::my_recur(node* n, int &aux){
	if (n == NULL) return 0;
	int L = my_recur(n->left, aux);    // nodes on the deepest path down the left side
	int R = my_recur(n->right, aux);   // nodes on the deepest path down the right side
	if (L + R > aux) aux = L + R;      // path left-bottom .. n .. right-bottom has L + R edges
	return 1 + (L > R ? L : R);        // n plus the deeper side
}

template <typename KeyT,
          typename MappedT,
          typename CompareT>
int CP::map_bst<KeyT, MappedT, CompareT>::furthest_distance() {
	if (mRoot == NULL) return -1;      // empty tree: defined as -1
	int best = 0;                      // one node: distance 0
	my_recur(mRoot, best);
	return best;
}

#endif
