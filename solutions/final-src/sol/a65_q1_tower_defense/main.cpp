#include <iostream>
#include <vector>
#include <cstdlib>
using namespace std;

int n, m, k, w;
vector<int> p, h, t;
int best = 0;                // most useful hits found so far

// decide the target of towers i, i+1, ..., k-1; hits = useful hits made so far
// h[] holds the power each monster still has
void shoot(int i, int hits) {
    if (hits + (k - i) <= best) return;       // even if every remaining tower hits, no improvement
    if (i == k) { best = hits; return; }
    // choice 1..m: tower i shoots monster j (only useful if j is in range and still alive)
    for (int j = 0; j < m; j++) {
        if (h[j] > 0 && abs(p[j] - t[i]) <= w) {
            h[j]--;
            shoot(i + 1, hits + 1);
            h[j]++;                           // undo
        }
    }
    // choice 0: tower i makes no useful hit (nothing in range, or it hits a monster already at 0)
    shoot(i + 1, hits);
}

int main() {
    cin >> n >> m >> k >> w;
    p.resize(m); h.resize(m); t.resize(k);
    long long total = 0;
    // monster positions, then their powers, then the tower positions
    for (int j = 0; j < m; j++) cin >> p[j];
    for (int j = 0; j < m; j++) { cin >> h[j]; total += h[j]; }
    for (int i = 0; i < k; i++) cin >> t[i];
    shoot(0, 0);
    cout << total - best << "\n";
}
