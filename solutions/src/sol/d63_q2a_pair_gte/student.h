#ifndef __STUDENT_H_
#define __STUDENT_H_

template <typename T1,typename T2>
bool CP::pair<T1,T2>::operator>=(const pair<T1,T2>& other) const {
  // NOTE: first, second are T1/T2 (int, string). Comparing THEM with < is fine;
  // only pair's own operator< and operator== are forbidden.

  if (other.first < first) return true;     // my first is bigger   -> I am greater
  if (first < other.first) return false;    // my first is smaller  -> I am smaller
  // here first == other.first, so the second decides:
  return !(second < other.second);          // second >= other.second  <=>  NOT (second < other.second)
}

#endif
