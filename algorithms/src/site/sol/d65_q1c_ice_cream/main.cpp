#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

const int LAST_DAY = 100000;                   // answers and scam days never exceed this

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m, start;
    cin >> n >> m >> start;
    // rateFrom[day] = new daily saving starting that day (0 = no change)
    vector<int> rateFrom(LAST_DAY + 1, 0);
    // index = 0..n-1: the change days come in any order
    for (int index = 0; index < n; index++) {
        int day, rate;
        cin >> day >> rate;
        rateFrom[day] = rate;
    }
    // savedBy[day] = money at the end of `day` if nobody steals it (a prefix sum)
    vector<long long> savedBy(LAST_DAY + 1);
    int rate = start;
    // day = 0..LAST_DAY (forward): apply a change, then add that day's saving
    for (int day = 0; day <= LAST_DAY; day++) {
        if (rateFrom[day] != 0) rate = rateFrom[day];
        savedBy[day] = (day > 0 ? savedBy[day - 1] : 0) + rate;
    }

    string output;
    // query = 0..m-1: every scam is independent
    for (int query = 0; query < m; query++) {
        long long price;
        int scamDay;
        cin >> price >> scamDay;
        // Enough by the scam day (buying comes first): the target is just `price`.
        // Otherwise everything saved up to the scam day is lost, so the total
        // must reach price + savedBy[scamDay] before he can buy.
        long long target = price + (savedBy[scamDay] >= price ? 0 : savedBy[scamDay]);
        // savedBy strictly increases: the first day reaching the target is a lower_bound
        int day = int(lower_bound(savedBy.begin(), savedBy.end(), target) - savedBy.begin());
        output += to_string(day);
        output += (query + 1 < m ? ' ' : '\n');
    }
    cout << output;
}
