#ifndef __STUDENT_H_
#define __STUDENT_H_

template <typename T>
void CP::queue<T>::move_to_front(size_t pos) {
  int p = pos;
  if (p <= 0 || p >= (int)mSize) return;   // pos 0 is already the front (and out-of-range = nothing to do)

  // logical position i lives at physical slot (mFront + i) % mCap  (circular array)
  T x = mData[(mFront + p) % mCap];        // remember the element that jumps the queue

  // Shift positions 0 .. p-1 one step toward the BACK (each moves from i-1 to i).
  // i visits p, p-1, ..., 1 (RIGHT to LEFT): slot i is overwritten only after its old value
  // was saved (i == p, saved in x) or already copied to i+1 in the previous step.
  for (int i = p; i >= 1; i--) {
    mData[(mFront + i) % mCap] = mData[(mFront + i - 1) % mCap];
  }

  mData[mFront] = x;                       // the saved element becomes the new front (position 0)
  // mSize, mFront and mCap are unchanged: same elements, new order. Cost O(pos).
}

#endif
