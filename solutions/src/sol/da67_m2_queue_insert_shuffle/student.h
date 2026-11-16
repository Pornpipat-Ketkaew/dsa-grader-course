#ifndef __STUDENT_H_
#define __STUDENT_H_

#include "queue.h"

template <typename T>
void CP::queue<T>::insert_shuffle(std::vector<T> items, size_t pos)
{
	int n = mSize;                  // old elements, logical positions 0 .. n-1
	int m = items.size();           // new elements
	int p = pos;                    // first new element goes to position p (0 <= p <= n)

	// New capacity: keep mCap if it is big enough, otherwise grow like ensureCapacity does.
	int cap = mCap;
	if (n + m > cap) cap = (n + m > 2 * cap) ? n + m : 2 * cap;
	T *arr = new T[cap]();
	int k = 0;                      // next free slot in arr

	// 1) Old positions 0 .. p-1 are copied unchanged.
	//    i visits 0, 1, ..., p-1 (front to back); old position i is at slot (mFront + i) % mCap.
	for (int i = 0; i < p; i++) {
		arr[k] = mData[(mFront + i) % mCap];
		k++;
	}

	// 2) Alternate: one new item, then one old element, while BOTH still have something left.
	//    i = next old position (starts at p), j = next item; each round moves both forward by 1.
	int i = p, j = 0;
	while (i < n && j < m) {
		arr[k] = items[j];                     k++; j++;
		arr[k] = mData[(mFront + i) % mCap];   k++; i++;
	}

	// 3) Whatever is left goes to the back, in order (only ONE of these loops can run).
	//    old positions i .. n-1, or items j .. m-1.
	while (i < n) { arr[k] = mData[(mFront + i) % mCap]; k++; i++; }
	while (j < m) { arr[k] = items[j];                   k++; j++; }

	delete[] mData;                 // replace the storage: the new array starts at slot 0
	mData  = arr;
	mCap   = cap;
	mFront = 0;
	mSize  = n + m;
}

#endif
