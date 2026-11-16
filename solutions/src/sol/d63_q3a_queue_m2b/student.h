#ifndef __STUDENT_H_
#define __STUDENT_H_



template <typename T>
void CP::queue<T>::move_to_back(size_t pos) {
  int n = mSize;
  int p = pos;
  if (p < 0 || p >= n) return;              // nothing to move (safety)

  // remember the element at position p (slot = (mFront + p) % mCap)
  T x = mData[(mFront + p) % mCap];

  // Shift everything AFTER p one step toward the front.
  // i visits positions p, p+1, ..., n-2 (left to right):
  // position i receives the element from position i+1.
  // Left to right is safe: we overwrite position i only after reading it (it was saved in x
  // or already copied to i-1).
  for (int i = p; i <= n - 2; i++) {
    mData[(mFront + i) % mCap] = mData[(mFront + i + 1) % mCap];
  }

  // the saved element goes to the last position n-1 (the back)
  mData[(mFront + n - 1) % mCap] = x;
  // mSize, mFront, mCap are unchanged: same elements, new order.
}

#endif
