#ifndef __STUDENT_H_
#define __STUDENT_H_

#include "priority_queue.h"
#include <vector>

template <typename T, typename Comp>
std::vector<int> CP::priority_queue<T, Comp>::unordered_index() {
  // In an ORDERED heap the array is sorted from highest to lowest priority,
  // so for every node i its left child (index 2i+1) must come before its
  // right child (index 2i+2): left must have HIGHER priority than right.
  //
  // Swapping the subtrees of node i is the only thing that can change which
  // child is on the left, and swaps at other nodes never change WHICH two
  // children node i has. So node i needs a swap exactly when its left child
  // has lower priority than its right child: mLess(left, right).
  std::vector<int> ans;

  // i visits 0, 1, 2, ... (top to bottom, left to right) and stops at the
  // last node that still has a right child (2i+2 < mSize). Leaves have no
  // children, so they never need a swap. Going upward through i also means
  // ans is already sorted from small to large, as the problem asks.
  for (int i = 0; 2 * i + 2 < (int)mSize; i++) {
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    if (mLess(mData[left], mData[right])) {
      ans.push_back(i);
    }
  }
  return ans;
}

#endif
