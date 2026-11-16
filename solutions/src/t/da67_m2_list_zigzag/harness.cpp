#include <iostream>
#include <set>
#include "list.h"
#include "student.h"
int main(){int n,m,t; std::cin>>n; CP::list<int> a,b; for(int i=0;i<n;i++){std::cin>>t;a.push_back(t);} std::cin>>m; for(int i=0;i<m;i++){std::cin>>t;b.push_back(t);}
 std::set<int*> s1; for(auto it=a.begin();it!=a.end();it++)s1.insert(&*it); for(auto it=b.begin();it!=b.end();it++)s1.insert(&*it);
 a.zigzag(b); std::set<int*> s2; for(auto it=a.begin();it!=a.end();it++)s2.insert(&*it);
 std::cout<<a.size()<<":"; for(auto it=a.begin();it!=a.end();it++)std::cout<<" "<<*it; std::cout<<" |"; auto it=a.end(); for(size_t i=0;i<a.size();i++){--it;std::cout<<" "<<*it;}
 std::cout<<"\n"<<(s1==s2?"same nodes":"CHANGED")<<" ls "<<b.size()<<(b.begin()==b.end()?" empty":" X")<<"\n"; b.push_back(1); }
