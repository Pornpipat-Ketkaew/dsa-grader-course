#ifndef __STUDENT_H_
#define __STUDENT_H_

// You may include library here
#include "segment_list.h"

template <typename T>
void CP::SegmentList<T>::rotate(iterator &a, iterator &b, long long k) {
  if (k == 0) return;                               // nothing moves; a and b stay valid

  // ---- 1. find c = b - k: walk back k elements from b, one SEGMENT at a time ----
  iterator c;
  if (b.off >= k) {
    c = iterator(b.ptr, b.off - k);                 // c is inside b's own segment
  } else {
    long long left = k - b.off;                     // elements still to step over
    node *p = b.ptr->prev;
    while (p->len < left) {                         // skip whole segments
      left -= p->len;
      p = p->prev;
    }
    c = iterator(p, p->len - left);
  }

  // ---- 2. cut segments so that a, c and b all start a segment (off == 0) ----
  // cut(it): the first it.off elements of it.ptr go into a NEW node placed in front of it
  // (allowed: it is a split, not a copy of a whole segment). it.ptr keeps the rest.
  // Iterators further LEFT inside the same node must follow the front part.
  auto cut = [&](iterator &it, iterator *l1, iterator *l2) {
    if (it.off == 0) return;
    node *x = it.ptr;
    long long front = it.off;
    iterator f = insert(iterator(x, 0), front, x->val);   // new node before x; mSize += front
    x->len -= front;
    mSize -= front;                                 // the total did not really change
    if (l1 && l1->ptr == x) l1->ptr = f.ptr;        // its offset is < front, unchanged
    if (l2 && l2->ptr == x) l2->ptr = f.ptr;
    it.off = 0;
  };
  cut(b, &c, &a);                                   // right to left, so left iterators get fixed
  cut(c, &a, nullptr);
  cut(a, nullptr, nullptr);

  // ---- 3. move the node chain [c, b) in front of a: 6 pointer writes, no copying ----
  node *A = a.ptr, *C = c.ptr, *Bn = b.ptr;
  node *first = C, *last = Bn->prev;                // the moved block
  node *beforeA = A->prev, *lastOfLeft = C->prev;   // lastOfLeft = end of [a, c)
  lastOfLeft->next = Bn;  Bn->prev = lastOfLeft;    // unhook the block
  beforeA->next = first;  first->prev = beforeA;    // hook it in front of A
  last->next = A;         A->prev = last;
  a = iterator(first, 0);                           // index a now holds the first moved element

  // ---- 4. merge equal neighbours at the three new joints ----
  // merge R into L (L = R->prev). Never merge with the header.
  auto merge = [&](node *L, node *R) {
    if (L == mHeader || R == mHeader || L->val != R->val) return;
    long long oldLen = L->len;
    L->len += R->len;
    L->next = R->next;
    R->next->prev = L;
    if (a.ptr == R) a = iterator(L, oldLen + a.off);   // keep a and b on the same element
    if (b.ptr == R) b = iterator(L, oldLen + b.off);
    delete R;
    mSegs--;
  };
  merge(first->prev, first);                        // beforeA | moved block
  merge(A->prev, A);                                // moved block | old [a, c)
  merge(Bn->prev, Bn);                              // old [a, c) | b
}

#endif
