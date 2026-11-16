#ifndef __STACK_STUDENT_H__
#define __STACK_STUDENT_H__
#include "stack.h"

template <typename T>
void CP::stack<T>::mitosis(int a, int b)
{
    // ---- 1. Turn "k-th from the top" into real array indices ----
    // The top of the stack is the LAST slot, mData[mSize - 1].
    // So "the k-th from the top" is mData[mSize - 1 - k].
    int top = (int)mSize - 1;   // index of the top element
    int lo  = top - b;          // index of the b-th from top (the LOWER end of the block)
    int hi  = top - a;          // index of the a-th from top (the HIGHER end of the block)
    int c   = b - a + 1;        // how many elements get a copy = how much the stack grows
    int newSize = (int)mSize + c;

    // ---- 2. Make room ONCE, only if needed ----
    // Same rule as ensureCapacity: grow to at least double, so later pushes stay cheap.
    if (newSize > (int)mCap) {
        int cap = (newSize > 2 * (int)mCap) ? newSize : 2 * (int)mCap;
        expand(cap);
    }

    // ---- 3. Move the elements ABOVE the block up by c ----
    // i walks real indices: from the top (top) down to just above the block (hi + 1).
    // We go top -> down because every element moves to a HIGHER slot (i + c);
    // going bottom -> up would overwrite elements we have not copied yet.
    // If the block already reaches the top (a == 0), then hi + 1 > top and this loop runs 0 times.
    for (int i = top; i >= hi + 1; i--) {
        mData[i + c] = mData[i];
    }

    // ---- 4. Write every element of the block twice ----
    // i walks real indices from hi down to lo.
    // The element that is (i - lo) places above lo ends up at
    //   d = lo + 2 * (i - lo)   and   d + 1   (original + its copy, side by side).
    // d is always >= i, so again we go top -> down to never overwrite an uncopied element.
    for (int i = hi; i >= lo; i--) {
        int d = lo + 2 * (i - lo);
        mData[d + 1] = mData[i];   // the copy
        mData[d]     = mData[i];   // the original (may already be in place when i == lo)
    }

    // ---- 5. Elements below lo did not move. Update the size. ----
    mSize = newSize;
}

#endif
