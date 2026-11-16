#include <iostream>
#include <vector>
#include "queue.h"
#include "student.h"
// input: N K pre, N values, K positions. `pre` dummies are pushed and popped first so the data wraps around.
int main(){int N,K,pre; std::cin>>N>>K>>pre; CP::queue<int> q; for(int i=0;i<pre;i++)q.push(-1); for(int i=0;i<pre;i++)q.pop();
 for(int i=0;i<N;i++){int x;std::cin>>x;q.push(x);} std::vector<size_t> p(K); for(auto&x:p)std::cin>>x; q.remove_many(p);
 q.print(); q.push(777); q.pop(); while(!q.empty()){std::cout<<q.front()<<" ";q.pop();} std::cout<<"\n";}
