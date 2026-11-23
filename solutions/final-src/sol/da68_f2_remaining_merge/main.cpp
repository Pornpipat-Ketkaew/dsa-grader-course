#include <iostream>
#include <vector>
using namespace std;

vector<long long> A, B;
long long counter = 0;       // how many times lines 11 and 14 run

// merge A[l..m] and A[m+1..r], exactly like the pseudocode, counting the leftover appends
void merge(int l, int m, int r) {
    int i = l, j = m + 1, k = l;
    // main loop: both halves still have elements
    while (i <= m && j <= r) {
        if (A[i] <= A[j]) B[k++] = A[i++];
        else B[k++] = A[j++];
    }
    // the left half is not empty yet: every append here is one run of line 11
    while (i <= m) { B[k++] = A[i++]; counter++; }
    // the right half is not empty yet: every append here is one run of line 14
    while (j <= r) { B[k++] = A[j++]; counter++; }
    // copy back A[l..r] <- B
    for (int t = l; t <= r; t++) A[t] = B[t];
}

void mergeSort(int l, int r) {
    if (l >= r) return;
    int m = (l + r) / 2;
    mergeSort(l, m);
    mergeSort(m + 1, r);
    merge(l, m, r);
}

int main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int n;
    cin >> n;
    A.resize(n); B.resize(n);
    // read the array
    for (int i = 0; i < n; i++) cin >> A[i];
    mergeSort(0, n - 1);
    cout << counter << "\n";
}
