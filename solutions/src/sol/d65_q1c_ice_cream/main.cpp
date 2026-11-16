#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

const int MAXD = 100000;          // answers never exceed day 100,000

int main() {
    std::ios_base::sync_with_stdio(false); std::cin.tie(0);

    int n, m;
    long long start;
    cin >> n >> m >> start;

    // newRate[d] = the new daily amount if Dae changes his mind on day d, or 0 if no change that day.
    vector<long long> newRate(MAXD + 1, 0);
    // c visits 0, 1, ..., n-1: read each "from day a, save s per day" line.
    for (int c = 0; c < n; c++) {
        int a; long long s;
        cin >> a >> s;
        newRate[a] = s;
    }

    // S[d] = total money at the END of day d, if nobody ever scams him.
    vector<long long> S(MAXD + 1);
    long long rate = start;
    // d visits 0, 1, ..., MAXD (left to right): apply a change on day d first, then save that day.
    for (int d = 0; d <= MAXD; d++) {
        if (newRate[d] != 0) rate = newRate[d];
        if (d == 0) S[d] = rate;
        else        S[d] = S[d - 1] + rate;
    }
    // S is STRICTLY increasing (every rate >= 1), so we can binary search on it.

    // q visits 0, 1, ..., m-1: answer each question independently, in input order.
    for (int q = 0; q < m; q++) {
        long long P; int X;
        cin >> P >> X;

        int ans;
        if (S[X] >= P) {
            // he already has P by the end of day X (buying beats the scam on day X):
            // the first day with S[d] >= P is the answer, and it is <= X.
            ans = lower_bound(S.begin(), S.end(), P) - S.begin();
        } else {
            // not enough by day X -> on day X all money is lost, and he restarts from 0.
            // money at end of day d (> X) = S[d] - S[X].  Need S[d] - S[X] >= P  <=>  S[d] >= P + S[X].
            ans = lower_bound(S.begin(), S.end(), P + S[X]) - S.begin();
        }
        cout << ans;
        if (q < m - 1) cout << ' ';
    }
    cout << '\n';
}
