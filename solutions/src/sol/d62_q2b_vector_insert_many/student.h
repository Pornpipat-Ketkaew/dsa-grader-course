#ifndef __STUDENT_H_
#define __STUDENT_H_

#include <algorithm>

template <typename T>
void CP::vector<T>::insert_many(CP::vector<std::pair<int,T>> data) {
  // 1) Sort the requests by position (.first), so we can meet them in order while scanning v.
  std::sort(data.begin(), data.end(),
            [](const std::pair<int,T> &a, const std::pair<int,T> &b) {
              return a.first < b.first;
            });

  int n = mSize;            // old size of v
  int m = data.size();      // number of values to insert
  T *arr = new T[n + m];    // new array, exactly big enough for old + new values

  int j = 0;                // j = next request in data not inserted yet
  int k = 0;                // k = next empty slot in arr

  // 2) Merge. i visits 0, 1, ..., n-1 (left to right): every OLD index once.
  //    Before copying old element i, first emit every request whose position is i
  //    (positions refer to the ORIGINAL v, so "position i" means "just before old element i").
  for (int i = 0; i < n; i++) {
    // emit requests at position i (at most one, since positions are distinct; while is safe anyway)
    while (j < m && data[j].first == i) {
      arr[k] = data[j].second;
      k++;
      j++;
    }
    arr[k] = mData[i];      // then the old element i itself
    k++;
  }

  // 3) Requests with position == n (insert at the very end) are still left.
  //    j visits the remaining requests in order.
  while (j < m) {
    arr[k] = data[j].second;
    k++;
    j++;
  }

  // 4) Replace the old storage (no leak), update the members.
  delete [] mData;
  mData = arr;
  mSize = n + m;
  mCap  = n + m;
}

#endif
