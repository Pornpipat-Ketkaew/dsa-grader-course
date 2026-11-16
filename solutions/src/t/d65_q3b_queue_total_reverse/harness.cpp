#include "queue.h"
#include "student.h"
#include <iostream>
#include <string>
int main(){CP::queue<int> q; std::string c; while(std::cin>>c){ if(c=="u"){int x;std::cin>>x;q.push(x);} else if(c=="o")q.pop(); else if(c=="r")q.reverse();
 else if(c=="f")std::cout<<q.front()<<" "<<q.back()<<" "<<q.size()<<"\n";} while(!q.empty()){std::cout<<q.front()<<" ";q.pop();} std::cout<<"\n";}
