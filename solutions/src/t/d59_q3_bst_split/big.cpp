// timing: 200,000 random keys, then 200,000 splits at decreasing values (each split is O(h))
#include <iostream>
#include <random>
#include <algorithm>
#include "map_bst.h"
#include "student.h"
int main(){ std::mt19937 g(5); CP::map_bst<int,int> m; std::vector<int> v(200000); for(auto&x:v){x=g()%1000000000; m[x]=1;}
  std::sort(v.begin(),v.end()); long long s=0;
  for(int i=(int)v.size()-1;i>=0;i--){ CP::map_bst<int,int> r = m.split(v[i]); s += (r.begin()!=r.end()); }
  std::cout<<s<<(m.begin()==m.end()?" empty":" left")<<"\n"; }
