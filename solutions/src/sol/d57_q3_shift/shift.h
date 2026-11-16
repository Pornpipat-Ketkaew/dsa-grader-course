void shift(int k) {
	// Circular doubly linked list WITH a header: the ring is  header -> first -> ... -> last -> header.
	// Rotating the data is the same as moving the HEADER to another gap in the ring.
	// No insert/erase, no new nodes: only 6 pointer changes.
	int n = mSize;
	if (n == 0) return;

	// shift left by k  ==  the element at position k becomes the new first.
	// Negative k (shift right) and k >= n are folded into 0 .. n-1.
	int s = ((k % n) + n) % n;           // C++ % keeps the sign of k, so add n and take % again
	if (s == 0) return;                  // a full turn: nothing changes

	// 1) Find the node that will be first: walk s steps from the current first.
	//    i visits 1, 2, ..., s; s < n so we never reach the header.
	node *newFirst = mHeader->next;
	for (int i = 1; i <= s; i++) {
		newFirst = newFirst->next;
	}
	node *newLast = newFirst->prev;      // the node just before it becomes the new last

	// 2) Take the header out of the ring: connect the old last directly to the old first.
	node *first = mHeader->next;
	node *last  = mHeader->prev;
	last->next  = first;
	first->prev = last;

	// 3) Put the header back between newLast and newFirst.
	newLast->next  = mHeader;
	mHeader->prev  = newLast;
	mHeader->next  = newFirst;
	newFirst->prev = mHeader;
	// mSize is unchanged; every data node stays where it is in memory.
}
