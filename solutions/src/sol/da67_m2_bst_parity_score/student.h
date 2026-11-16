#ifndef __STUDENT_H_
#define __STUDENT_H_

#include "map_bst.h"

// parity_score(d) = | (#odd keys) - (#even keys) |  over nodes with depth <= d (root = depth 0)
template <typename KeyT, typename MappedT, typename CompareT>
int CP::map_bst<KeyT, MappedT, CompareT>::parity_score(int d) {
    int score = 0;                                   // (#odd so far) - (#even so far)
    parity_score_helper(mRoot, d, score);            // the root may still go d levels deeper
    return score < 0 ? -score : score;               // "difference" = absolute value
}

// depth here means "how many MORE levels below current_node we may still visit".
// Starting at d for the root, each step down subtracts 1; below 0 we are deeper than d -> stop.
// (The helper's signature has no d, so counting down avoids needing one.)
template <typename KeyT, typename MappedT, typename CompareT>
void CP::map_bst<KeyT, MappedT, CompareT>::parity_score_helper(node *current_node, int depth, int &parity_score){
    if (current_node == NULL) return;                // nothing here
    if (depth < 0) return;                           // this node is deeper than d: skip it and everything below
    if (current_node->data.first % 2 == 1) parity_score++;   // odd key  (keys are >= 0)
    else                                   parity_score--;   // even key
    parity_score_helper(current_node->left,  depth - 1, parity_score);
    parity_score_helper(current_node->right, depth - 1, parity_score);
}

#endif
