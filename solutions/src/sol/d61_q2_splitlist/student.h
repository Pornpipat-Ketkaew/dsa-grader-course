void splitList(list<T>& list1, list<T>& list2) {
    // No new nodes allowed: we only re-link existing ones.
    // Circular list with header: real nodes are mHeader->next ... mHeader->prev.
    int n = mSize;
    if (n == 0) return;                       // nothing to move
    int k = (n + 1) / 2;                      // first half (the bigger one when n is odd)

    // 1) Find the last node of the first half.
    //    i visits 1, 2, ..., k-1: each step moves lastA one node forward from the first node.
    node *firstA = mHeader->next;
    node *lastA  = firstA;
    for (int i = 1; i <= k - 1; i++) {
        lastA = lastA->next;
    }
    node *firstB = lastA->next;               // == mHeader when n == 1 (second half empty)
    node *lastB  = mHeader->prev;

    // 2) Hang firstA .. lastA after the current last node of list1.
    node *t1 = list1.mHeader->prev;           // list1's last node (or its header if list1 is empty)
    t1->next = firstA;
    firstA->prev = t1;
    lastA->next = list1.mHeader;
    list1.mHeader->prev = lastA;
    list1.mSize += k;

    // 3) Hang firstB .. lastB after the current last node of list2 (only if the second half exists).
    if (n - k > 0) {
        node *t2 = list2.mHeader->prev;
        t2->next = firstB;
        firstB->prev = t2;
        lastB->next = list2.mHeader;
        list2.mHeader->prev = lastB;
        list2.mSize += n - k;
    }

    // 4) *this is now empty: its header points to itself both ways.
    mHeader->next = mHeader;
    mHeader->prev = mHeader;
    mSize = 0;
}
