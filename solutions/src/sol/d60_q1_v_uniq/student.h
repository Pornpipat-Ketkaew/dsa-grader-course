#ifndef __STUDENT_H_
#define __STUDENT_H_

#include <set>

template <typename T>
void CP::vector<T>::uniq() {
  std::set<T> seen;        // every value we have already KEPT (works for int, float, string: they have <)
  int n = mSize;           // old size, saved before we start shrinking
  int w = 0;               // write index: next slot for a kept value

  // r visits 0, 1, ..., n-1 (left to right) so the FIRST copy of each value is the one we meet first.
  // w <= r always, so mData[w] = mData[r] only overwrites a slot we have already read.
  for (int r = 0; r < n; r++) {
    if (seen.count(mData[r]) == 0) {   // first time we see this value -> keep it
      seen.insert(mData[r]);
      mData[w] = mData[r];             // move it left into the next free slot
      w++;
    }
    // else: a later repeat -> skip it (do not copy)
  }

  mSize = w;               // kept values are mData[0 .. w-1]; mCap is unchanged
}

#endif
