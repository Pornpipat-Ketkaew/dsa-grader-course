#include <iostream>
#include "map_bst.h"
#include "student.h"
// the grader's format from the PDF: print BEFORE each insert, and once more at the end
int main(){ CP::map_bst<int,int> m; int n; std::cin>>n; for(int i=0;i<n;i++){int x;std::cin>>x; std::cout<<"Leaves = "<<m.leaves_count()<<"\n"; m[x]=x;}
 std::cout<<"Leaves = "<<m.leaves_count()<<"\n"; }
