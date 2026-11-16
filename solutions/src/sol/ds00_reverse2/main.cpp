#include <iostream>
#include <vector>
using namespace std;
void reverse(vector<int> &v,vector<int>::iterator a,vector<int>::iterator b) {
  //write your code only in this function

  // We reverse the half-open range [a, b): from *a up to the element just BEFORE b.
  if (a == b) return;                       // empty range: nothing to do

  vector<int>::iterator left  = a;          // first element of the range
  vector<int>::iterator right = b - 1;      // LAST element of the range (b itself is excluded)

  // Each round swaps the two ends, then both step one place toward the middle.
  // left visits a, a+1, a+2, ...   right visits b-1, b-2, b-3, ...
  // Stop when they meet (odd length: the middle stays) or cross (even length).
  while (left < right) {
    int tmp = *left;                        // swap by hand: std::reverse / extra includes are forbidden
    *left   = *right;
    *right  = tmp;
    left++;
    right--;
  }
}
int main() {
//read input
int n,a,b;
cin >> n;
vector<int> v;
for (int i = 0;i < n;i++) {
int c;
cin >> c;
v.push_back(c);
}
cin >> a >> b;
//call function
reverse(v,v.begin()+a,v.begin()+b+1);
//display content of the vector
for (auto &x : v) {
cout << x << " ";
}
cout << endl;
}
