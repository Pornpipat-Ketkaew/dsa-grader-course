#include <iostream>
#include <vector>
using namespace std;

// Line 07 moves value k one step left once for every element that is
// LEFT of k in the original array and LARGER than k.
// So we need, for every value v:  greaterBefore[v] = #{ j < pos(v) : A[j] > v }.
//
// Fenwick tree (BIT) over the VALUES 1..n: bit counts how many values we have seen so far.
// Scanning the array left to right, before adding A[i]:
//   seen so far           = i
//   seen and <= A[i]      = prefix(A[i])
//   seen and >  A[i]      = i - prefix(A[i])     <- the answer for value A[i]

int n;
vector<int> bit;

void add(int v) {                          // mark value v as seen
    for (int x = v; x <= n; x += x & (-x)) // climb to every BIT cell that covers v
        bit[x]++;
}
int prefix(int v) {                        // how many seen values are in 1..v
    int s = 0;
    for (int x = v; x > 0; x -= x & (-x))  // walk down through the covering cells
        s += bit[x];
    return s;
}

int main() {
    ios_base::sync_with_stdio(false); cin.tie(0);
    int m;
    cin >> n >> m;
    vector<int> A(n);
    for (int i = 0; i < n; i++) cin >> A[i];   // values are distinct and in 1..n

    bit.assign(n + 1, 0);
    vector<int> greaterBefore(n + 1, 0);       // indexed by VALUE
    for (int i = 0; i < n; i++) {              // i = 0 .. n-1, left to right
        greaterBefore[A[i]] = i - prefix(A[i]);
        add(A[i]);
    }

    for (int q = 0; q < m; q++) {
        int k;
        cin >> k;
        cout << greaterBefore[k] << "\n";
    }
}
