#include <cstdio>
#include <vector>
using namespace std;

int main() {
    int n, m;
    long long k;
    if (scanf("%d %d %lld", &n, &m, &k) != 3) return 0;
    // P[i] = A[0] + ... + A[i-1]           (grass in the first i cells)
    // Q[i] = P[i] + i*k                    (cost of mowing the first i cells)
    // Both have n+1 entries: index 0 .. n.
    vector<long long> P(n + 1, 0), Q(n + 1, 0);
    // i = 0 .. n-1: add cell i to the running totals
    for (int i = 0; i < n; i++) {
        long long a;
        scanf("%lld", &a);
        P[i + 1] = P[i] + a;
        Q[i + 1] = Q[i] + a + k;
    }
    // Mowing cells a .. j-1 costs Q[j] - Q[a] and gives P[j] - P[a] grass.
    // Q is non-decreasing (A[i] >= 0, k >= 0), so the j's we can afford form
    // a prefix j = a, a+1, ..., best  ->  binary search for the LAST j with
    // Q[j] <= Q[a] + budget.
    for (int q = 0; q < m; q++) {
        int a;
        long long b;
        scanf("%d %lld", &a, &b);
        long long limit = Q[a] + b;
        int lo = a, hi = n, best = a;   // j = a (mow nothing) always fits
        // window [lo, hi] over end positions j, halves every turn
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (Q[mid] <= limit) { best = mid; lo = mid + 1; }   // affordable: try further right
            else                 { hi = mid - 1; }               // too expensive: go left
        }
        printf("%lld\n", P[best] - P[a]);
    }
}
