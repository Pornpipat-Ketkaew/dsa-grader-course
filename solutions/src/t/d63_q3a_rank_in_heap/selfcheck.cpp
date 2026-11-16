// Self-check: random heaps (many duplicates, int and greater<int>); compare get_rank with popping a copy.
#define protected public
#include <iostream>
#include <random>
#include <functional>
#include "priority_queue.h"
#include "student.h"
template <class C> bool run(std::mt19937 &g){
  CP::priority_queue<int,C> pq; int n=1+g()%20; for(int i=0;i<n;i++) pq.push(g()%6);
  for(int p=0;p<n;p++){ int x=pq.mData[p]; CP::priority_queue<int,C> c(pq); size_t k=0; while(c.top()!=x){c.pop();k++;}
    if(pq.get_rank(p)!=k){ std::cout<<"MISMATCH\n"; return false; } }
  return true; }
int main(){ std::mt19937 g(7); for(int t=0;t<3000;t++){ if(!run<std::less<int>>(g)||!run<std::greater<int>>(g)) return 1; } std::cout<<"selfcheck ok\n"; }
