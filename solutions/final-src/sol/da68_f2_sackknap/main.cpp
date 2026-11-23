#include <cstdio>
#include <vector>
using namespace std;

int main() {
    int n, V;
    if (scanf("%d %d", &n, &V) != 2) return 0;
    const long long INF = (long long)4e18;
    // best[s] = cheapest total price of a group of items whose weights add up to exactly s
    vector<long long> best(V + 1, INF);
    best[0] = 0;                              // the empty group
    // add the items one at a time
    for (int i = 0; i < n; i++) {
        int w;
        long long p;
        if (scanf("%d %lld", &w, &p) != 2) return 0;
        // weights from big to small so that item i is used at most once (int: counting down)
        for (int s = V; s >= w; s--) {
            if (best[s - w] != INF && best[s - w] + p < best[s]) best[s] = best[s - w] + p;
        }
    }
    printf("%lld\n", best[V] == INF ? -1LL : best[V]);
}
