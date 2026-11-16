#ifndef __STUDENT_H_
#define __STUDENT_H_


template <typename T>
void CP::vector<T>::insert(iterator position,iterator first,iterator last) {
  int pos = position - begin();   // save the INDEX now: ensureCapacity may move mData,
                                  // and then the pointer `position` would point to freed memory
  int k   = last - first;         // how many elements we insert: first, first+1, ..., last-1
  int n   = mSize;                // old size

  ensureCapacity(mSize + k);      // at most one reallocation (first/last are in ANOTHER vector, still valid)

  // Shift the tail right by k.
  // i visits n-1, n-2, ..., pos (RIGHT to LEFT, real indices), so no element is overwritten before it moves.
  for (int i = n - 1; i >= pos; i--) {
    mData[i + k] = mData[i];
  }

  // Copy the source range into the gap.
  // j visits 0, 1, ..., k-1: gap slot pos+j receives first[j] (= *(first + j)).
  for (int j = 0; j < k; j++) {
    mData[pos + j] = first[j];
  }

  mSize += k;
}

#endif
