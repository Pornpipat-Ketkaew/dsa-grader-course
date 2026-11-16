#include <iostream>
#include "queue.h"
#include "student.h"
// input: n a b pre, then n values. Push `pre` dummies and pop them first so that mFront != 0 and data wraps around.
int main(){int n,a,b,pre; std::cin>>n>>a>>b>>pre; CP::queue<int> q; for(int i=0;i<pre;i++)q.push(-1); for(int i=0;i<pre;i++)q.pop();
 for(int i=0;i<n;i++){int x;std::cin>>x;q.push(x);} q.reverse(a,b); while(!q.empty()){std::cout<<q.front()<<" ";q.pop();} std::cout<<"\n";}
