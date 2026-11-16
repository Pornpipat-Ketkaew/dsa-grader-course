#ifndef __STUDENT_H_
#define __STUDENT_H_

#include <vector>
#include "queue.h"

template <typename T>
void CP::queue<T>::remove_many(std::vector<size_t> pos)
{
  int n = mSize;                       // old size
  int k = pos.size();

  // 1) Mark which logical positions must go. pos is NOT sorted, so a mark array is the easy way.
  //    j visits 0, 1, ..., k-1: every requested position once.
  std::vector<bool> del(n, false);
  for (int j = 0; j < k; j++) {
    del[pos[j]] = true;
  }

  // 2) Compact in ONE pass, like erase_many on a vector, but every logical index i
  //    is turned into a physical slot (mFront + i) % mCap because the array is circular.
  //    i (read) visits 0, 1, ..., n-1 left to right; w (write) <= i, so we never
  //    overwrite an element we still have to read.
  int w = 0;
  for (int i = 0; i < n; i++) {
    if (!del[i]) {
      mData[(mFront + w) % mCap] = mData[(mFront + i) % mCap];
      w++;
    }
  }

  mSize = w;                           // the kept elements are logical positions 0 .. w-1; mFront unchanged
}

#endif
