#include <iostream>
#include <set>
#include "list.h"
// input: three lists (count then values): x a b. Prints a and b forward + backward, sizes,
// and checks that no node was created or destroyed (the node addresses of a,b are exactly the old ones).
void show(CP::list<int>&l){ std::cout<<l.size()<<":"; for(auto it=l.begin();it!=l.end();it++)std::cout<<" "<<*it; std::cout<<" |";
 auto it=l.end(); for(size_t i=0;i<l.size();i++){--it;std::cout<<" "<<*it;} std::cout<<"\n"; }
int main(){ CP::list<int> L[3]; for(int k=0;k<3;k++){int n,v;std::cin>>n;for(int i=0;i<n;i++){std::cin>>v;L[k].push_back(v);}}
 std::set<int*> before; for(int k=0;k<3;k++) for(auto it=L[k].begin();it!=L[k].end();it++) before.insert(&*it);
 L[0].splitList(L[1],L[2]); std::set<int*> after; for(int k=0;k<3;k++) for(auto it=L[k].begin();it!=L[k].end();it++) after.insert(&*it);
 for(int k=0;k<3;k++) show(L[k]); std::cout<<(before==after?"same nodes":"NODES CHANGED")<<"\n"; L[0].push_back(5); show(L[0]); }
