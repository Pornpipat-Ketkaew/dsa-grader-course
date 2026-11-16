#ifndef __STUDENT_H_
#define __STUDENT_H_


template <typename T>
void CP::vector<T>::erase_many(const std::vector<int> &pos) {
  int n = mSize;          // old size
  int m = pos.size();     // how many positions to delete (sorted ascending)
  int j = 0;              // j = next entry of pos we have not matched yet
  int w = 0;              // w = next slot to WRITE a kept element into

  // i visits 0, 1, ..., n-1 (left to right): every old element, once.
  // w <= i always, so writing mData[w] never destroys an element we still have to read.
  for (int i = 0; i < n; i++) {
    if (j < m && pos[j] == i) {
      // element i must be deleted: do NOT copy it, just move to the next position in pos.
      // (the inner while also skips duplicates in pos, e.g. pos = 3 3, to be safe)
      while (j < m && pos[j] == i) j++;
    } else {
      mData[w] = mData[i];   // keep element i: move it down into the first free slot
      w++;
    }
  }

  mSize = w;              // the kept elements are mData[0 .. w-1]; capacity unchanged
}

#endif
