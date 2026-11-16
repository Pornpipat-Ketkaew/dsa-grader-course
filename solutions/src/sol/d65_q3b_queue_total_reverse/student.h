#ifndef _STUDENT_H_INCLUDED
#define _STUDENT_H_INCLUDED
#include "queue.h"

// aux == 0 : normal   -> logical front is mData[mFront], data runs forward
// aux == 1 : reversed -> logical front is the PHYSICAL LAST element,
//                        logical back is mData[mFront]

template <typename T>
void CP::queue<T>::reverse() {
  aux = 1 - aux;                       // O(1): just flip the direction
}

template <typename T>
const T& CP::queue<T>::front() const {
  if (aux == 0) return mData[mFront];
  return mData[(mFront + mSize - 1) % mCap];
}

template <typename T>
const T& CP::queue<T>::back() const {
  if (aux == 0) return mData[(mFront + mSize - 1) % mCap];
  return mData[mFront];
}

template <typename T>
void CP::queue<T>::push(const T& element) {
  ensureCapacity(mSize + 1);           // expand keeps the physical order, so both modes stay valid
  if (aux == 0) {
    mData[(mFront + mSize) % mCap] = element;     // add after the physical end
  } else {
    mFront = (mFront + mCap - 1) % mCap;          // add before the physical start
    mData[mFront] = element;
  }
  mSize++;
}

template <typename T>
void CP::queue<T>::pop() {
  if (aux == 0) {
    mFront = (mFront + 1) % mCap;      // remove the physical start
  }                                    // reversed: removing the physical end needs no index change
  mSize--;
}

#endif
