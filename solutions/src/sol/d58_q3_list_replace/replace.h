void replace(const T& x, list<T>& y) {
  // This file is #included INSIDE class CP::list, so we can use node, mHeader, insert, erase directly.
  // The list is circular with a header: the real nodes are mHeader->next ... mHeader->prev,
  // and walking ->next from the last real node brings us back to mHeader.

  if (&y == this) {                    // l.replace(x, l): copy y first, or we would loop forever
    list<T> copy(y);
    replace(x, copy);
    return;
  }

  node *p = mHeader->next;             // p walks the ORIGINAL nodes from the first to the last
  while (p != mHeader) {
    node *nextOld = p->next;           // remember where to continue BEFORE we touch p
    if (p->data == x) {
      // Insert a copy of every element of y just before p, in y's order.
      // q visits y's nodes from first (y.mHeader->next) to last, stopping at y's header.
      for (node *q = y.mHeader->next; q != y.mHeader; q = q->next) {
        insert(iterator(p), q->data);  // insert() links a new node between p->prev and p, mSize++
      }
      erase(iterator(p));              // unlink and delete p itself, mSize--
    }
    p = nextOld;                       // continue with the next ORIGINAL node:
                                       // the copies of y we just inserted are never re-checked,
                                       // so a y that contains x (e.g. y = 3 2 1, x = 2) is safe
  }
}
