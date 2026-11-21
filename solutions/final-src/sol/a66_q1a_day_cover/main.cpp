#include <cstdio>
#include <bitset>
#include <vector>
using namespace std;

const int MAXN = 1000;
int n, m, best;
vector<bitset<MAXN>> avail;   // avail[s] bit d-1 = student s is free on day d
bitset<MAXN> full;            // bits 0 .. n-1 set: "every day is covered"

// Decide for students i, i+1, ..., m-1 whether to invite them.
// used = how many are invited so far, cover = the days they cover together.
void pick(int i, int used, const bitset<MAXN> &cover) {
    if (used >= best) return;                 // cannot beat the best answer found: prune
    if (cover == full) { best = used; return; }  // every day covered: inviting more never helps
    if (i == m) return;                       // no students left and some day is still empty
    pick(i + 1, used + 1, cover | avail[i]);  // choice 1: invite student i
    pick(i + 1, used, cover);                 // choice 2: skip student i
}

int main() {
    if (scanf("%d %d", &n, &m) != 2) return 0;
    avail.assign(m, bitset<MAXN>());
    // student s = 0 .. m-1: k free days, then the k day numbers (1-based)
    for (int s = 0; s < m; s++) {
        int k;
        if (scanf("%d", &k) != 1) return 0;
        // read the k days and switch on their bits
        for (int j = 0; j < k; j++) {
            int d;
            if (scanf("%d", &d) != 1) return 0;
            avail[s][d - 1] = 1;
        }
    }
    // the target: days 1 .. n, i.e. bits 0 .. n-1
    for (int d = 0; d < n; d++) full[d] = 1;
    best = m + 1;                             // larger than any real answer
    pick(0, 0, bitset<MAXN>());
    printf("%d\n", best);
}
