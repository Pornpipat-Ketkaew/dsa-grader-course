#include <iostream>
#include <map>
#include <vector>
#include <string>
using namespace std;

struct Room {
    long long size;     // capacity
    long long guests;   // people inside (always >= 1)
};

map<long long, vector<Room>> groups;   // Group ID -> its rooms, oldest first
long long totalRooms = 0, totalGuests = 0;

// Put k people into NEW rooms of size s, filling each room before opening the next.
void addNewRooms(vector<Room> &rooms, long long k, long long s) {
    while (k > 0) {
        long long put = (k < s) ? k : s;
        rooms.push_back({s, put});
        totalRooms++;
        totalGuests += put;
        k -= put;
    }
}

int main() {
    ios_base::sync_with_stdio(false); cin.tie(0);
    int n;
    cin >> n;
    string out;                          // all D reports, printed after the last event
    for (int e = 0; e < n; e++) {
        char c;
        cin >> c;
        if (c == 'I') {                  // I k s g: check in -> new rooms only
            long long k, s, g;
            cin >> k >> s >> g;
            addNewRooms(groups[g], k, s);
        } else if (c == 'E') {           // E k s g: fill existing rooms (oldest first), then new rooms
            long long k, s, g;
            cin >> k >> s >> g;
            vector<Room> &rooms = groups[g];          // an unknown group simply starts empty (= Check In)
            for (int i = 0; i < (int)rooms.size() && k > 0; i++) {   // i = 0 .. last: oldest room first
                long long space = rooms[i].size - rooms[i].guests;
                long long put = (k < space) ? k : space;
                rooms[i].guests += put;
                totalGuests += put;
                k -= put;
            }
            addNewRooms(rooms, k, s);
        } else if (c == 'O') {           // O g: the whole group leaves
            long long g;
            cin >> g;
            auto it = groups.find(g);
            if (it == groups.end()) continue;         // unknown group: skip
            for (int i = 0; i < (int)it->second.size(); i++) totalGuests -= it->second[i].guests;
            totalRooms -= it->second.size();
            groups.erase(it);
        } else if (c == 'M') {           // M g: all rooms of g become one room
            long long g;
            cin >> g;
            auto it = groups.find(g);
            if (it == groups.end() || it->second.empty()) continue;
            Room one = {0, 0};
            for (int i = 0; i < (int)it->second.size(); i++) {
                one.size += it->second[i].size;
                one.guests += it->second[i].guests;
            }
            totalRooms -= (long long)it->second.size() - 1;
            it->second.assign(1, one);
        } else if (c == 'S') {           // S g: every room with >= 2 guests splits in two
            long long g;
            cin >> g;
            auto it = groups.find(g);
            if (it == groups.end()) continue;
            vector<Room> res;            // build the new order: (first half, second half) per room
            for (int i = 0; i < (int)it->second.size(); i++) {
                Room r = it->second[i];
                if (r.guests <= 1) { res.push_back(r); continue; }
                long long first = (r.guests + 1) / 2;  // odd -> the first new room gets one more
                res.push_back({r.size, first});
                res.push_back({r.size, r.guests - first});
                totalRooms++;
            }
            it->second = res;
        } else if (c == 'D') {           // D: report rooms and guests right now
            out += to_string(totalRooms) + " " + to_string(totalGuests) + "\n";
        }
    }
    cout << out;
}
