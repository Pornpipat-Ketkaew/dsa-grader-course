#ifndef __DENSE_GRAPH_H__
#define __DENSE_GRAPH_H__

#include <vector>
using namespace std;

// Adjacency matrix: hasEdge[a][b] is true when the edge a -> b exists.
// Every query and update is O(1); the matrix costs n * n bits.
class DenseGraph {
public:
    DenseGraph() : DenseGraph(3) {}

    DenseGraph(int n_in) : n(n_in), hasEdge(n_in, vector<bool>(n_in, false)) {}

    DenseGraph(const DenseGraph& G) : n(G.n), hasEdge(G.hasEdge) {}

    void AddEdge(int a, int b) {
        hasEdge[a][b] = true;     // adding an existing edge changes nothing
    }

    void RemoveEdge(int a, int b) {
        hasEdge[a][b] = false;    // removing a missing edge changes nothing
    }

    bool DoesEdgeExist(int a, int b) const {
        return hasEdge[a][b];
    }

    DenseGraph Transpose() const {
        DenseGraph transposed(n);
        // from = 0..n-1, to = 0..n-1 (both upward): visit every cell once,
        // the edge from -> to becomes to -> from (the matrix is mirrored)
        for (int from = 0; from < n; from++)
            for (int to = 0; to < n; to++)
                if (hasEdge[from][to]) transposed.hasEdge[to][from] = true;
        return transposed;
    }

protected:
    int n;
    vector<vector<bool>> hasEdge;
};
#endif // __DENSE_GRAPH_H__
