#include <vector>
#include <set>
using namespace std;

template <typename T>
vector<T> Union(const vector<T>& A, const vector<T>& B) {
    vector<T> v(A.begin(), A.end());          // 1) everything in A, in A's order
    set<T> inA(A.begin(), A.end());           // fast "is x in A?" lookups, O(log n) each

    // 2) i visits 0, 1, ..., B.size()-1 (B's order): append B[i] only if A does not have it.
    //    B itself has no repeats (it is a set), so each value is appended at most once.
    for (int i = 0; i < (int)B.size(); i++) {
        if (inA.count(B[i]) == 0) v.push_back(B[i]);
    }
    return v;
}

template <typename T>
vector<T> Intersect(const vector<T>& A, const vector<T>& B) {
    vector<T> v;
    set<T> inB(B.begin(), B.end());           // fast "is x in B?" lookups

    // i visits 0, 1, ..., A.size()-1 (A's order, because the answer must follow A's order):
    // keep A[i] only if B also has it.
    for (int i = 0; i < (int)A.size(); i++) {
        if (inB.count(A[i]) > 0) v.push_back(A[i]);
    }
    return v;
}
