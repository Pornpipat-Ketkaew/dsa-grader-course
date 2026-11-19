#ifndef __STUDENT_H_
#define __STUDENT_H_

// You may include library here
#include "queue.h"

// Cost: O(other.size()). Elements of `this` that have no partner are never touched.
template <typename T>
void CP::queue<T>::fusion(CP::queue<T>& other) {
  long long n = mSize;                 // size of this
  long long m = other.mSize;           // size of other (the same queue when &other == this)

  if (m <= n) {
    // Backs lined up: this[n-m .. n-1] pairs with other[0 .. m-1]; this[0 .. n-m-1] stays as is.
    // Write the surviving sums forward, starting at n-m. The write index w never passes the
    // read index i, so we never overwrite an element we still have to read.
    long long w = n - m;
    for (long long j = 0; j < m; j++) {            // j = 0 .. m-1, front to back
      long long i = n - m + j;
      T x = mData[(mFront + i) % mCap];
      T y = other.mData[(other.mFront + j) % other.mCap];
      T v = x + y;
      if (v == 0) continue;                         // a pair that adds up to 0 disappears
      mData[(mFront + w) % mCap] = v;
      w++;
    }
    mSize = w;                                      // (also right when other is this)
  } else {
    // other is longer: other[0 .. m-n-1] has no partner and goes IN FRONT of the result.
    ensureCapacity(m);                              // the result has at most m elements;
                                                    // this is the only time mData may move
    long long d = m - n;
    long long w = 0;
    for (long long i = 0; i < n; i++) {            // i = 0 .. n-1: this[i] pairs with other[d + i]
      T x = mData[(mFront + i) % mCap];
      T y = other.mData[(other.mFront + d + i) % other.mCap];
      T v = x + y;
      if (v == 0) continue;
      mData[(mFront + w) % mCap] = v;
      w++;
    }
    mSize = w;
    for (long long j = d - 1; j >= 0; j--) {       // j = d-1 down to 0: put them in front, last one first
      mFront = (mFront + mCap - 1) % mCap;          // step the front one slot back (circularly)
      mData[mFront] = other.mData[(other.mFront + j) % other.mCap];
      mSize++;
    }
  }

  if (&other != this) {                // other becomes empty but keeps its own mData
    other.mSize = 0;
    other.mFront = 0;
  }
}

#endif
