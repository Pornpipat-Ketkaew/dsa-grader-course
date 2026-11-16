#ifndef __STUDENT_H_
#define __STUDENT_H_


template <typename T>
T CP::queue<T>::operator[](int idx) {
  int n = mSize;

  // Negative idx counts from the back: -1 = last (position n-1), -n = front (position 0).
  // So a negative idx means position n + idx.
  int k = idx;
  if (k < 0) {
    k = n + k;            // e.g. n = 5: -1 -> 4, -2 -> 3, -5 -> 0
  }

  // logical position k lives at physical slot (mFront + k) % mCap  (circular array)
  return mData[(mFront + k) % mCap];
}

#endif
