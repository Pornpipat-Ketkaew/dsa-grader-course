#include <bits/stdc++.h>
#include "vector.h"
#include "student.h"
int main(){CP::vector<std::string> s; for(auto x:{"b","a","b","c","a"}) s.push_back(x); s.uniq(); for(auto&x:s) std::cout<<x<<" "; std::cout<<"\n";
CP::vector<float> f; for(float x:{1.5f,2.f,1.5f}) f.push_back(x); f.uniq(); for(auto&x:f) std::cout<<x<<" "; std::cout<<"\n";
CP::vector<int> b; for(int i=0;i<1000000;i++) b.push_back(i%1000); auto t=clock(); b.uniq(); std::cerr<<"big "<<(double)(clock()-t)/CLOCKS_PER_SEC<<"s\n"; std::cout<<b.size()<<"\n";}
