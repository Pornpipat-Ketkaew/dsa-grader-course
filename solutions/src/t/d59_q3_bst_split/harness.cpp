#define protected public
#include <iostream>
#include <set>
#include <vector>
#include "map_bst.h"
#include "student.h"
typedef CP::map_bst<int,int> M;
void pr(M::node* n){ if(!n) return; std::cout<<"("; pr(n->right); std::cout<<")"<<n->data.first<<":"<<n->data.second<<"["; pr(n->left); std::cout<<"]"; }
int main(){
  int n,val; std::cin>>n; std::vector<int> v(n); for(auto&x:v)std::cin>>x; std::cin>>val;
  M m1,m2; for(int x:v) m1[x]=-x;
  std::set<void*> before; for(auto it=m1.begin();it!=m1.end();it++) before.insert(&(*it));
  m2 = m1.split(val);
  bool ok = m1.checkParent() && m2.checkParent();
  if (m1.mRoot && m1.mRoot->parent) ok=false;
  if (m2.mRoot && m2.mRoot->parent) ok=false;
  std::set<void*> after; int prev=-1e9;
  for(auto it=m1.begin();it!=m1.end();it++){ after.insert(&(*it)); if(it->first<=prev||it->first>=val) ok=false; prev=it->first; }
  prev=-1e9;
  for(auto it=m2.begin();it!=m2.end();it++){ after.insert(&(*it)); if(it->first<=prev||it->first<val) ok=false; prev=it->first; }
  if (after!=before) ok=false;                     // exactly the same nodes, none created / deleted
  pr(m1.mRoot); std::cout<<"\n"; pr(m2.mRoot); std::cout<<"\n"<<(ok?"OK":"BAD")<<"\n";
}
