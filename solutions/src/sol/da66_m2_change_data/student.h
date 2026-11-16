#ifndef __STUDENT_H_
#define __STUDENT_H_

#include <vector>
#include <stack>
#include <queue>
#include <list>
#include <set>
#include <map>
#include <string>
#include <utility>

using std::string;

// Helper: in queue q, replace every value `from` by `to`, keeping the order.
// Rotate exactly n = q.size() times: take the front, fix it, push it to the back.
// After n rotations every element went round once and is back in its original order.
void fix_queue(std::queue<int> &q, int from, int to)
{
    int n = q.size();
    for (int k = 0; k < n; k++) {          // k = 0 .. n-1: one rotation per element
        int x = q.front();
        q.pop();
        if (x == from) x = to;
        q.push(x);
    }
}

// stack< vector< queue<int> > >: the ints live only inside the queues.
// A stack can only be read from the top, so: pop everything into a vector,
// fix it, then push it back in reverse so the old bottom becomes the bottom again.
void change_1(std::stack<std::vector<std::queue<int>>> &a, int from, int to)
{
    std::vector<std::vector<std::queue<int>>> tmp;      // tmp[0] = old top
    while (!a.empty()) {
        tmp.push_back(std::move(a.top()));
        a.pop();
    }
    for (int i = 0; i < (int)tmp.size(); i++)           // every vector
        for (int j = 0; j < (int)tmp[i].size(); j++)    // every queue in it
            fix_queue(tmp[i][j], from, to);
    for (int i = (int)tmp.size() - 1; i >= 0; i--)      // i = last .. 0: old bottom pushed first
        a.push(std::move(tmp[i]));
}

// map< string, pair< priority_queue<int>, int > >: ints are in the priority queue
// and in the pair's second. Keys are strings: never change.
// A priority_queue can only show its top, so pop everything into a new one.
void change_2(std::map<string, std::pair<std::priority_queue<int>, int>> &a, int from, int to)
{
    for (auto &kv : a) {                                 // the map VALUE can be changed in place
        std::priority_queue<int> &pq = kv.second.first;
        std::priority_queue<int> fixed;
        while (!pq.empty()) {
            int x = pq.top();
            pq.pop();
            if (x == from) x = to;
            fixed.push(x);                               // the heap re-orders itself
        }
        pq = std::move(fixed);
        if (kv.second.second == from) kv.second.second = to;
    }
}

// set< pair< list<int>, map<int, pair<int,string>> > >: ints are in the list,
// in the map KEYS and in map values' first. Set elements and map keys are const
// (changing them in place would break the sorted order), so build new ones.
void change_3(std::set<std::pair<std::list<int>, std::map<int, std::pair<int, string>>>> &a, int from, int to)
{
    std::set<std::pair<std::list<int>, std::map<int, std::pair<int, string>>>> result;
    for (auto &e : a) {
        std::list<int> l = e.first;                      // copy, then fix the copy
        for (int &x : l)
            if (x == from) x = to;

        std::map<int, std::pair<int, string>> m;
        for (auto &kv : e.second) {
            int key = kv.first;
            if (key == from) key = to;                   // a changed key = a new map entry
            std::pair<int, string> v = kv.second;
            if (v.first == from) v.first = to;
            m[key] = v;
        }
        result.insert(std::make_pair(l, m));             // the set puts it in the right place
    }
    a = std::move(result);
}

#endif
