#include <cstdio>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    double W;
    int n;
    if (scanf("%lf %d", &W, &n) != 2) return 0;
    vector<double> v(n), w(n);
    // read the n prices, then the n weights
    for (int i = 0; i < n; i++) if (scanf("%lf", &v[i]) != 1) return 0;
    for (int i = 0; i < n; i++) if (scanf("%lf", &w[i]) != 1) return 0;

    vector<int> idx(n);
    // idx = 0, 1, ..., n-1, to be sorted by price per unit of weight
    for (int i = 0; i < n; i++) idx[i] = i;
    sort(idx.begin(), idx.end(), [&](int a, int b) {
        return v[a] * w[b] > v[b] * w[a];     // v[a]/w[a] > v[b]/w[b] without dividing
    });

    double total = 0, room = W;
    // greedy: take the most valuable-per-kilo items first, the last one only partly
    for (int k = 0; k < n && room > 0; k++) {
        int i = idx[k];
        if (w[i] <= room) {                   // the whole item fits
            total += v[i];
            room -= w[i];
        } else {                              // take the fraction that fills the bag, then stop
            total += v[i] * (room / w[i]);
            room = 0;
        }
    }
    printf("%.4f\n", total);
}
