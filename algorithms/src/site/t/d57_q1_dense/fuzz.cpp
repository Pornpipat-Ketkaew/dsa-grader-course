// random AddEdge / RemoveEdge / copy / assign / Transpose against a std::set of pairs
#include "densegraph.h"
#include <iostream>
#include <random>
#include <set>
using namespace std;
int main(int argc, char** argv) {
    mt19937 rng(atoi(argv[1]));
    for (int round = 0; round < 200; round++) {
        int n = 1 + rng() % 12;
        DenseGraph g(n); set<pair<int,int>> ref;
        for (int op = 0; op < 80; op++) {
            int a = rng() % n, b = rng() % n, kind = rng() % 10;
            if (kind < 5) { g.AddEdge(a, b); ref.insert({a, b}); }
            else if (kind < 8) { g.RemoveEdge(a, b); ref.erase({a, b}); }
            else if (kind == 8) { DenseGraph copy(g); g = DenseGraph(1); g = copy; }
            else { DenseGraph t = g.Transpose(); DenseGraph back = t.Transpose();
                   for (int x = 0; x < n; x++) for (int y = 0; y < n; y++)
                       if (t.DoesEdgeExist(y, x) != (ref.count({x, y}) > 0) || back.DoesEdgeExist(x, y) != (ref.count({x, y}) > 0)) { cout << "NO transpose\n"; return 0; } }
            for (int x = 0; x < n; x++) for (int y = 0; y < n; y++)
                if (g.DoesEdgeExist(x, y) != (ref.count({x, y}) > 0)) { cout << "NO\n"; return 0; }
        }
        DenseGraph empty; for (int x = 0; x < 3; x++) for (int y = 0; y < 3; y++) if (empty.DoesEdgeExist(x, y)) { cout << "NO default\n"; return 0; }
    }
    cout << "OK\n";
}
