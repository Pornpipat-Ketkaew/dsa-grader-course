#include <iostream>
#include "list.h"
#include "student.h"
int main(){int n,m; std::cin>>n>>m; CP::list<int> l; for(int j=0;j<n;j++){int t;std::cin>>t;l.push_back(t);}
 CP::list<CP::list<int>> ls; for(int i=0;i<m;i++){ls.push_back(CP::list<int>()); int k;std::cin>>k; for(int j=0;j<k;j++){int t;std::cin>>t;ls.back().push_back(t);}}
 l.merge(ls); std::cout<<l.size()<<":"; for(auto it=l.begin();it!=l.end();it++)std::cout<<" "<<*it; std::cout<<" |";
 auto it=l.end(); for(size_t i=0;i<l.size();i++){--it;std::cout<<" "<<*it;} std::cout<<"\nls "<<ls.size()<<":";
 for(auto q=ls.begin();q!=ls.end();q++){ std::cout<<" "<<q->size()<<(q->begin()==q->end()?"e":"X"); q->push_back(1); } std::cout<<"\n"; }
