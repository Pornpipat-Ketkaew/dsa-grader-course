#include "base.h"
// input: n values, x, m values (for y); prints l forward and backward and its size
int main(){ CP::list<int> l,y; int n,m,x,v; std::cin>>n; for(int i=0;i<n;i++){std::cin>>v;l.push_back(v);} std::cin>>x>>m; for(int i=0;i<m;i++){std::cin>>v;y.push_back(v);}
 l.replace(x,y); std::cout<<l.size()<<":"; for(auto it=l.begin();it!=l.end();it++)std::cout<<" "<<*it; std::cout<<" |";
 auto it=l.end(); for(size_t i=0;i<l.size();i++){--it; std::cout<<" "<<*it;} std::cout<<" | y "<<y.size()<<"\n";
 CP::list<int> z; z.push_back(1); z.push_back(2); z.replace(1,z); for(auto t=z.begin();t!=z.end();t++)std::cout<<*t; std::cout<<"\n"; }
