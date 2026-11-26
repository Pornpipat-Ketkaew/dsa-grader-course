#include <iostream>
#include <string>
#include "student.h"
int main(){int n,m; std::cin>>n; std::vector<int>a(n); for(auto&x:a)std::cin>>x; std::cin>>m; std::vector<int>b(m); for(auto&x:b)std::cin>>x;
 for(auto x:Union(a,b))std::cout<<x<<" "; std::cout<<"|\n"; for(auto x:Intersect(a,b))std::cout<<x<<" "; std::cout<<"|\n";
 std::vector<std::string> s1={"x","y"}, s2={"y","z"}; for(auto x:Union(s1,s2))std::cout<<x; for(auto x:Intersect(s1,s2))std::cout<<x; std::cout<<"\n";}
