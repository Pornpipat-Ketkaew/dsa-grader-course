// checks parents, sizes and that old contents of left/right are dropped (ASan catches leaks/double frees)
#include <iostream>
#include "map_bst.h"
#include "student.h"
int main(){
  int n; std::cin>>n; CP::map_bst<int,int> m,left,right;
  for(int i=0;i<n;i++){int k;std::cin>>k;m[k]=i;}
  left[100]=1; left[50]=2; right[7]=3;           // junk that must be deleted (unless m is empty)
  size_t before=m.size();
  auto t=m.subtree(left,right);
  bool ok = m.checkParent() && left.checkParent() && right.checkParent();
  if (n==0) ok = ok && left.size()==2 && right.size()==1 && t.first==0;   // empty: untouched
  else ok = ok && m.size()==1 && left.size()+right.size()+1==before;
  // trees must still work after the move: insert/erase into them
  if (n>0){ left[-5]=9; right[1000]=9; left.erase(-5); right.erase(1000); ok = ok && left.checkParent() && right.checkParent(); }
  std::cout<<(ok?"OK":"BAD")<<"\n";
}
