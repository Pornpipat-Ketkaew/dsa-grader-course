#ifndef __STUDENT_H_
#define __STUDENT_H_

#include <algorithm>

template <typename T>
bool CP::vector<T>::block_swap(iterator a, iterator b, size_t m) {
  // Turn the iterators (pointers into mData) into INDICES. Use long long so
  // "before begin()" shows up as a negative number instead of wrapping around.
  long long ia = a - begin();          // block A = indices ia .. ia+m-1
  long long ib = b - begin();          // block B = indices ib .. ib+m-1
  long long len = (long long)m;
  long long n = (long long)mSize;

  // ---- 1) validate: if anything is wrong, return false and touch nothing ----
  if (len <= 0) return false;                          // m must be > 0
  if (ia < 0 || ib < 0) return false;                  // block starts before the vector
  if (ia + len > n || ib + len > n) return false;      // last index ia+m-1 / ib+m-1 must be <= n-1
  bool disjoint = (ia + len <= ib) || (ib + len <= ia); // A ends before B starts, or B ends before A starts
  if (!disjoint) return false;                         // blocks overlap

  // ---- 2) swap element by element ----
  // k visits 0, 1, ..., m-1 (left to right): the k-th element of block A
  // trades places with the k-th element of block B.
  for (int k = 0; k < (int)len; k++) {
    std::swap(mData[ia + k], mData[ib + k]);
  }
  return true;
}

#endif
