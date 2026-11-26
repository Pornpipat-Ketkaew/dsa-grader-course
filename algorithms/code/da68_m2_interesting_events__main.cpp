#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int boothCount, needed;
    cin >> boothCount >> needed;

    // Sweep events: +1 on the opening day, -1 on the day AFTER closing (the booth is open on r too).
    vector<pair<int, int>> events;
    events.reserve(2 * boothCount);
    // booth = 0..boothCount-1: two events per booth
    for (int booth = 0; booth < boothCount; booth++) {
        int open, close;
        cin >> open >> close;
        events.push_back({open, +1});
        events.push_back({close + 1, -1});
    }
    sort(events.begin(), events.end());

    // Sweep left to right. Between two consecutive event days the number of open booths is
    // constant, so we only record where "interesting" stretches START and END.
    // interestingFrom[i] < interestingUntil[i]: days in [from, until) have >= needed booths.
    vector<int> interestingFrom, interestingUntil;
    int openNow = 0;
    // index = 0..events.size()-1 in day order; all events of one day are applied together
    for (size_t index = 0; index < events.size(); ) {
        int day = events[index].first;
        bool wasInteresting = openNow >= needed;
        // apply every event that happens on this day
        while (index < events.size() && events[index].first == day) {
            openNow += events[index].second;
            index++;
        }
        bool isInteresting = openNow >= needed;
        if (!wasInteresting && isInteresting) interestingFrom.push_back(day);
        if (wasInteresting && !isInteresting) interestingUntil.push_back(day);
    }

    int queryCount;
    cin >> queryCount;
    // query = 0..queryCount-1: binary search for the last stretch that starts on or before x
    for (int query = 0; query < queryCount; query++) {
        int x;
        cin >> x;
        int stretch = int(upper_bound(interestingFrom.begin(), interestingFrom.end(), x) - interestingFrom.begin()) - 1;
        bool interesting = stretch >= 0 && x < interestingUntil[stretch];
        cout << (interesting ? "YES" : "NO") << '\n';
    }
}
