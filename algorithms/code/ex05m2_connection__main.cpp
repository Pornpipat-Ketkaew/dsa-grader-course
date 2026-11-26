#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, e, k;
    cin >> n >> e >> k;
    vector<vector<int>> neighbors(n);
    // edge = 0..e-1: friendship is mutual, store both directions
    for (int edge = 0; edge < e; edge++) {
        int a, b;
        cin >> a >> b;
        neighbors[a].push_back(b);
        neighbors[b].push_back(a);
    }

    vector<int> distance(n, -1);         // -1 = not reached in the current BFS
    vector<int> queue(n);
    int best = 0;
    // student = 0..n-1: one BFS per student, cut off at depth k
    for (int student = 0; student < n; student++) {
        int write = 0;
        queue[write++] = student;
        distance[student] = 0;
        // read moves forward while write appends: BFS pops students in order of
        // distance 0, 1, 2, ..., so everything in the queue is within distance k
        for (int read = 0; read < write; read++) {
            int person = queue[read];
            if (distance[person] == k) continue;          // do not step beyond k
            for (int other : neighbors[person])
                if (distance[other] == -1) {
                    distance[other] = distance[person] + 1;
                    queue[write++] = other;
                }
        }
        best = max(best, write);                          // write = friends within k, self included
        // reset only the students this BFS touched: O(reached) instead of O(n)
        for (int index = 0; index < write; index++) distance[queue[index]] = -1;
    }
    cout << best << '\n';
}
