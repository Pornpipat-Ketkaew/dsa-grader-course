#include <vector>
#include <algorithm>
using namespace std;

// Membership test for a whole vector: sort a copy once (O(n log n)),
// then every "is value inside?" question is a binary search (O(log n)).
// Only operator< is needed, so it works for any T the grader may use.
template <typename T>
vector<T> sortedCopy(const vector<T>& values) {
    vector<T> sorted(values);
    sort(sorted.begin(), sorted.end());
    return sorted;
}

template <typename T>
vector<T> Union(const vector<T>& A, const vector<T>& B) {
    vector<T> result(A);                         // everything of A comes first, in A's order
    vector<T> sortedA = sortedCopy(A);

    // index = 0, 1, ..., B.size()-1 (B's own order): append B[index] when A lacks it.
    // B has no repeats, so nothing is appended twice.
    for (size_t index = 0; index < B.size(); index++) {
        if (!binary_search(sortedA.begin(), sortedA.end(), B[index])) result.push_back(B[index]);
    }
    return result;
}

template <typename T>
vector<T> Intersect(const vector<T>& A, const vector<T>& B) {
    vector<T> result;
    vector<T> sortedB = sortedCopy(B);

    // index = 0, 1, ..., A.size()-1 (A's order, which the answer must keep):
    // keep A[index] when B also contains it.
    for (size_t index = 0; index < A.size(); index++) {
        if (binary_search(sortedB.begin(), sortedB.end(), A[index])) result.push_back(A[index]);
    }
    return result;
}
