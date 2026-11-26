#ifndef __SPARSE_GRAPH_H__
#define __SPARSE_GRAPH_H__

#include <vector>
#include <set>
using namespace std;

// Adjacency "lists" kept as sets: outgoing[a] holds every b with an edge a -> b.
// Memory is O(n + |E|); a set gives O(log degree) add / remove / lookup
// and ignores duplicates for free.
class SparseGraph {
public:
    SparseGraph() : SparseGraph(3) {}

    SparseGraph(int n_in) : n(n_in), outgoing(n_in) {}

    SparseGraph(const SparseGraph& G) : n(G.n), outgoing(G.outgoing) {}

    void AddEdge(int a, int b) {
        outgoing[a].insert(b);    // already there -> insert does nothing
    }

    void RemoveEdge(int a, int b) {
        outgoing[a].erase(b);     // not there -> erase does nothing
    }

    bool DoesEdgeExist(int a, int b) const {
        return outgoing[a].count(b) > 0;
    }

    SparseGraph Transpose() const {
        SparseGraph transposed(n);
        // from = 0..n-1 (upward), then each stored neighbour: every edge is
        // visited exactly once and stored reversed. Because "from" only grows,
        // it is always the largest value in transposed.outgoing[to], so the
        // hint end() makes each insert amortized O(1): O(n + |E|) in total.
        for (int from = 0; from < n; from++)
            for (int to : outgoing[from])
                transposed.outgoing[to].insert(transposed.outgoing[to].end(), from);
        return transposed;
    }

protected:
    int n;
    vector<set<int>> outgoing;
};
#endif // __SPARSE_GRAPH_H__
