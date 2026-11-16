#ifndef __STUDENT_H_
#define __STUDENT_H_

#include <algorithm>

template <typename T>
void CP::queue<T>::reverse(int a,int b) {
  int left  = a;     // logical index from the front: 0 = the front of the queue
  int right = b;

  // Two pointers walking toward each other:
  // left visits a, a+1, a+2, ...   right visits b, b-1, b-2, ...
  // stop when they meet (odd length: the middle element stays) or cross (even length).
  while (left < right) {
    // logical index i lives at physical slot (mFront + i) % mCap  (the array is circular)
    int pl = (mFront + left)  % mCap;
    int pr = (mFront + right) % mCap;
    std::swap(mData[pl], mData[pr]);
    left++;
    right--;
  }
}

#endif
