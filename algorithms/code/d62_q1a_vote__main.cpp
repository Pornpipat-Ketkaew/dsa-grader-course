#include <iostream>
#include <string>
#include <unordered_map>
#include <vector>
#include <algorithm>
#include <functional>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int voterCount, seatCount;
    cin >> voterCount >> seatCount;

    // votesOf[name] = number of ballots carrying that name (hash table: O(1) per ballot)
    unordered_map<string, int> votesOf;
    // ballot = 0, 1, ..., voterCount-1: read every ballot once and add one vote
    for (int ballot = 0; ballot < voterCount; ballot++) {
        string name;
        cin >> name;
        votesOf[name]++;                          // a new name starts at 0
    }

    // keep only the vote totals; the names are no longer needed
    vector<int> totals;
    totals.reserve(votesOf.size());
    for (const auto& entry : votesOf) totals.push_back(entry.second);

    // fewer than seatCount candidates with votes -> everybody is elected
    int lastPlace = min(seatCount, (int)totals.size()) - 1;   // 0-based rank of the weakest winner

    // put the (lastPlace+1)-th largest total at index lastPlace in O(m) on average
    nth_element(totals.begin(), totals.begin() + lastPlace, totals.end(), greater<int>());

    // ties with the K-th place are also elected, but they have the same total: print it
    cout << totals[lastPlace] << '\n';
}
