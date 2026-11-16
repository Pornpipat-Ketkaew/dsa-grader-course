#ifndef __STUDENT_H_
#define __STUDENT_H_

#include <vector>
using namespace std;

template <typename T,typename Comp>
size_t CP::priority_queue<T,Comp>::get_rank(size_t pos) const {
  // x will be at the top after we pop every element that has HIGHER priority than x.
  // So the answer = how many elements y have higher priority than x,
  // i.e. mLess(x, y) is true  ("x is less important than y").
  // Equal elements do NOT count: once only equals of x are left, top() already equals x.
  const T &x = mData[pos];

  // Heap property: a parent is never less important than its child.
  // So if a node is NOT more important than x, none of its descendants is either:
  // all nodes we must count form a connected piece hanging from the root.
  // Walk that piece only (depth-first, with our own stack of indices) -> O(answer) time.
  size_t count = 0;
  std::vector<int> st;
  if (mSize > 0 && mLess(x, mData[0])) st.push_back(0);
  while (!st.empty()) {
    int i = st.back();
    st.pop_back();
    count++;                                    // mData[i] is more important than x
    int c1 = 2 * i + 1, c2 = 2 * i + 2;         // children of i in the array heap
    if (c1 < (int)mSize && mLess(x, mData[c1])) st.push_back(c1);
    if (c2 < (int)mSize && mLess(x, mData[c2])) st.push_back(c2);
  }
  return count;
}

#endif
