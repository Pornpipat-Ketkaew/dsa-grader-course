#include <iostream>
#include <vector>
#include "queue.h"
#include "student.h"
int main(){int n,m,pos,pre; std::cin>>n>>m>>pos>>pre; CP::queue<int> q; for(int i=0;i<pre;i++)q.push(-1); for(int i=0;i<pre;i++)q.pop();
 for(int i=0;i<n;i++){int x;std::cin>>x;q.push(x);} std::vector<int> it(m); for(auto&x:it)std::cin>>x; q.insert_shuffle(it,pos);
 q.print(); q.push(777); q.pop(); q.print();}
