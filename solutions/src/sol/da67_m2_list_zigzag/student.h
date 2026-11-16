#ifndef __STUDENT_H_
#define __STUDENT_H_

// You can include library here
#include "list.h"

template <typename T>
void CP::list<T>::zigzag(CP::list<T> &ls) {
    // No new nodes: we move ls's nodes into our ring by changing pointers.
    // Pattern: a1 b1 a2 b2 a3 b3 ...  (a = our nodes, b = ls's nodes); leftovers go to the end.
    node *a = mHeader->next;             // next node of OURS that still needs a partner after it
    node *b = ls.mHeader->next;          // next node of ls not moved yet

    // Each round puts one b right after one a, then both move on.
    // Stops when either list runs out (a reaches our header, or b reaches ls's header).
    while (a != mHeader && b != ls.mHeader) {
        node *nextA = a->next;           // save both "next" pointers BEFORE re-linking
        node *nextB = b->next;

        // link b between a and nextA
        b->prev = a;
        b->next = nextA;
        a->next = b;
        nextA->prev = b;

        a = nextA;
        b = nextB;
    }

    // If ls still has nodes (our list ran out first), hang b .. ls's last node after our last node.
    if (b != ls.mHeader) {
        node *myLast = mHeader->prev;
        node *lsLast = ls.mHeader->prev;
        myLast->next  = b;
        b->prev       = myLast;
        lsLast->next  = mHeader;
        mHeader->prev = lsLast;
    }
    // (If OUR list still has nodes, they are already in place at the end.)

    mSize += ls.mSize;                   // every node of ls is now ours
    ls.mHeader->next = ls.mHeader;       // ls becomes an empty ring
    ls.mHeader->prev = ls.mHeader;
    ls.mSize = 0;
}

#endif
