#ifndef __STUDENT_H_
#define __STUDENT_H_

template <typename T>
void CP::vector<T>::compress() {
    if (mCap == mSize) return;          // already tight: nothing to do

    T *arr = new T[mSize]();            // new array of EXACTLY mSize slots

    // i visits 0, 1, ..., mSize-1 (left to right): copy every real element, same order.
    // Slots mSize..mCap-1 of the old array are unused garbage, so we don't copy them.
    for (int i = 0; i < (int)mSize; i++) {
        arr[i] = mData[i];
    }

    delete [] mData;                    // free the old (too big) array -> no memory leak
    mData = arr;
    mCap  = mSize;                      // capacity now equals size; mSize itself is unchanged
}

#endif
