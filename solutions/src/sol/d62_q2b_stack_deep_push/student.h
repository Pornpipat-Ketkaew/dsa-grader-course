#ifndef __STUDENT_H_
#define __STUDENT_H_


template <typename T>
void CP::stack<T>::deep_push(size_t pos,const T& value) {
  // The stack is stored bottom -> top in mData[0 .. mSize-1]; the TOP is mData[mSize-1].
  // "pos slots below the top" = array index idx = mSize - pos.
  //   pos = 0      -> idx = mSize  (above the top: a normal push)
  //   pos = mSize  -> idx = 0      (under the bottom)
  int n   = mSize;
  int idx = n - (int)pos;

  ensureCapacity(mSize + 1);        // make room for one more (may reallocate; we use indices, so it's safe)

  // Open a gap at idx: shift mData[idx .. n-1] one step right (toward the top).
  // i visits n-1, n-2, ..., idx (RIGHT to LEFT), so nothing is overwritten before it moves.
  for (int i = n - 1; i >= idx; i--) {
    mData[i + 1] = mData[i];
  }

  mData[idx] = value;               // drop the value into the gap
  mSize++;
}

#endif
