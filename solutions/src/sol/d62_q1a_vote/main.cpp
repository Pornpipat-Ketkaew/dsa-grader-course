#include <iostream>
#include <map>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false); cin.tie(0);

    int n, k;
    cin >> n >> k;

    // 1) Count the votes: cnt[name] = how many ballots have that name.
    map<string, int> cnt;
    // i visits 0, 1, ..., n-1: read one ballot each time and add 1 to that name.
    for (int i = 0; i < n; i++) {
        string name;
        cin >> name;
        cnt[name]++;                 // a new name starts at 0, then becomes 1
    }

    // 2) Copy only the vote counts (we don't need the names any more).
    vector<int> votes;
    // a map has no int index: this range-for visits every (name, count) pair once, in name order
    for (auto &p : cnt) {
        votes.push_back(p.second);
    }

    // 3) Sort from MOST votes to FEWEST.
    sort(votes.begin(), votes.end(), greater<int>());

    // 4) The K-th place (index k-1) is the weakest winner.
    //    If fewer than K people got votes, everyone wins -> the weakest is the last one.
    int m = votes.size();
    int last = min(k, m) - 1;
    cout << votes[last] << '\n';
}
