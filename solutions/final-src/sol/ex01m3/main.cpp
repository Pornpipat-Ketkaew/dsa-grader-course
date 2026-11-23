#include <iostream>
#include <vector>
using namespace std;

int n, A;
vector<long long> T;

// how many customers have been seated by time t (inclusive)?
// chef i seats someone at 0, T[i], 2T[i], ...  ->  t / T[i] + 1 customers
long long seatedBy(long long t) {
    long long total = 0;
    // add up all n chefs
    for (int i = 0; i < n; i++) total += t / T[i] + 1;
    return total;
}

int main() {
    cin >> n >> A;
    T.resize(n);
    // read the meal times of the n chefs
    for (int i = 0; i < n; i++) cin >> T[i];
    // answer each of the A questions independently
    for (int q = 0; q < A; q++) {
        long long c;
        cin >> c;
        // smallest t with seatedBy(t) >= c; t = T[0] * c is surely enough (chef 0 alone does it)
        long long lo = 0, hi = T[0] * c;
        // binary search on the answer
        while (lo < hi) {
            long long mid = lo + (hi - lo) / 2;
            if (seatedBy(mid) >= c) hi = mid;  // customer c is seated by mid: answer <= mid
            else lo = mid + 1;
        }
        cout << lo << "\n";
    }
}
