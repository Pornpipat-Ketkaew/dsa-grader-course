// checks the address rules: other keeps its mData; this keeps its mData unless capacity had to grow
#define protected public
#include "queue.h"
#include "student.h"
#include <iostream>
#include <deque>
#include <random>
int main(){
  std::mt19937 g(7); int bad=0;
  for(int t=0;t<20000;t++){
    CP::queue<int> A,B; std::deque<int> a,b;
    int na=g()%9, nb=g()%9, junk=g()%5;
    for(int i=0;i<junk;i++){A.push(1);A.pop();B.push(2);B.pop();}      // move mFront around
    for(int i=0;i<na;i++){int v=(int)(g()%7)-3;A.push(v);a.push_back(v);}
    for(int i=0;i<nb;i++){int v=(int)(g()%7)-3;B.push(v);b.push_back(v);}
    bool self = g()%5==0;
    int *da=A.mData,*db=B.mData; size_t capA=A.mCap; size_t L = std::max(na, self?na:nb);
    if(self) A.fusion(A); else A.fusion(B);
    if(!self && (B.mData!=db || B.mSize!=0)) bad++;
    if(L<=capA && A.mData!=da) bad++;
  }
  std::cout<<(bad?"BAD":"OK")<<"\n";
}
