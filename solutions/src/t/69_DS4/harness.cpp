// structural checks after every rotate: prev/next consistent, len >= 1, no equal neighbours,
// mSegs / mSize right, a and b valid; and node reuse: at most 3 new nodes per rotate (the cuts)
#define protected public
#include <iostream>
#include <vector>
#include <random>
#include <set>
#include "segment_list.h"
#include "student.h"
typedef CP::SegmentList<int> SL;
int main(){
  std::mt19937 g(11); int bad=0;
  for(int t=0;t<3000;t++){
    int K=1+g()%8; std::vector<std::pair<long long,int>> s; int prev=-1;
    for(int i=0;i<K;i++){int v; do v=g()%3; while(v==prev); prev=v; s.push_back({1+(long long)(g()%4),v});}
    SL L(s); long long n=L.size();
    for(int q=0;q<6;q++){
      long long a=g()%n, b=a+1+g()%(n-a), k=g()%(b-a);
      SL::iterator A=L.begin(),B=L.begin(); for(long long i=0;i<a;i++)++A; for(long long i=0;i<b;i++)++B;
      std::set<SL::node*> before; for(SL::node*x=L.mHeader->next;x!=L.mHeader;x=x->next) before.insert(x);
      L.rotate(A,B,k);
      size_t segs=0; long long sz=0; int fresh=0;
      for(SL::node*x=L.mHeader->next;x!=L.mHeader;x=x->next){
        segs++; sz+=x->len; if(x->len<1) bad++; if(x->next->prev!=x || x->prev->next!=x) bad++;
        if(x->next!=L.mHeader && x->next->val==x->val) bad++;
        if(!before.count(x)) fresh++;
      }
      if(segs!=L.mSegs || sz!=L.mSize || sz!=n || fresh>3) bad++;
      if(A.ptr==L.mHeader || A.off>=A.ptr->len) bad++;
      if(B.ptr!=L.mHeader && B.off>=B.ptr->len) bad++;
      if(B.ptr==L.mHeader && (b!=n || B.off!=0)) bad++;
    }
  }
  std::cout<<(bad?"BAD":"OK")<<"\n";
}
