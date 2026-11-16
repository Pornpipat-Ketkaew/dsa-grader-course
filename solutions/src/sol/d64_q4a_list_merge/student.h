#ifndef __STUDENT_H_
#define __STUDENT_H_
#include <algorithm>

template <typename T>
void CP::list<T>::merge(CP::list<CP::list<T>> &ls) {
  // Must be O(ls.size()): we may NOT walk the elements. We move whole chains of nodes
  // by changing a few pointers at their two ends.
  //
  // Each list x is a ring:  x.mHeader -> first -> ... -> last -> x.mHeader
  // We cut first..last out of x's ring and hang it after our own last node.

  // it visits every list stored in ls, from the first to the last
  // (ls is a CP::list of lists, so we walk it with its iterator).
  for (auto it = ls.begin(); it != ls.end(); it++) {
    CP::list<T> &x = *it;                // the list stored in this node of ls (a reference, no copy)
    if (x.mSize == 0) continue;          // nothing to move

    node *first = x.mHeader->next;       // x's first and last real nodes
    node *last  = x.mHeader->prev;
    node *myLast = mHeader->prev;        // our current last node (our header if we are empty)

    // hang first..last after myLast, and close the ring at our header
    myLast->next  = first;
    first->prev   = myLast;
    last->next    = mHeader;
    mHeader->prev = last;
    mSize += x.mSize;

    // x keeps its header but becomes empty
    x.mHeader->next = x.mHeader;
    x.mHeader->prev = x.mHeader;
    x.mSize = 0;
  }
}

#endif
