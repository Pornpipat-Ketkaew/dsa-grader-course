#ifndef __STUDENT_H__
#define __STUDENT_H__

#include <algorithm>
#include <vector>
#include "priority_queue.h"

template <typename T,typename Comp >
T CP::priority_queue<T,Comp>::get_kth(size_t k) const {
  // For k <= 3 the answer is always inside the top 3 levels of the heap:
  // indices 0 (root), 1..2 (depth 1), 3..6 (depth 2)  ->  at most 7 candidates.
  int limit = std::min((int)mSize, 7);

  // copy the candidates (we must not touch mData: the function is const)
  std::vector<T> cand;
  // i visits 0, 1, ..., limit-1 (left to right): the first three levels of the heap array.
  for (int i = 0; i < limit; i++) {
    cand.push_back(mData[i]);
  }

  // Sort from HIGHEST priority to lowest, using the heap's own comparator.
  // mLess(a,b) == true means "a has LOWER priority than b",
  // so "a comes first" when b is less than a  ->  mLess(b, a).
  std::sort(cand.begin(), cand.end(),
            [this](const T &a, const T &b) { return mLess(b, a); });

  return cand[k - 1];   // k = 1 -> the top, k = 2 -> second pop, k = 3 -> third pop
}

#endif
