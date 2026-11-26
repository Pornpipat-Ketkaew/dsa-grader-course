#include <iostream>
#include <unordered_map>
using namespace std;

const long long UNKNOWN = -1;

unordered_map<long long, long long> fatherOf;   // fatherOf[child] = father (ids have 13 digits)

// Two hash look-ups: child -> father -> grandfather. UNKNOWN if either link is missing.
long long grandfatherOf(long long person) {
    auto father = fatherOf.find(person);        // find(), never fatherOf[person]: [] would insert
    if (father == fatherOf.end()) return UNKNOWN;
    auto grandfather = fatherOf.find(father->second);
    if (grandfather == fatherOf.end()) return UNKNOWN;
    return grandfather->second;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int relationCount, queryCount;
    cin >> relationCount >> queryCount;
    fatherOf.reserve(2 * relationCount);         // one allocation instead of repeated rehashing

    // relation = 0, 1, ..., relationCount-1: store each "father -> son" edge
    for (int relation = 0; relation < relationCount; relation++) {
        long long father, son;
        cin >> father >> son;
        fatherOf[son] = father;
    }

    // query = 0, 1, ..., queryCount-1: answer in input order
    for (int query = 0; query < queryCount; query++) {
        long long first, second;
        cin >> first >> second;
        long long grandfatherFirst = grandfatherOf(first);
        // cousins: two different people whose (known) grandfathers are the same person
        bool cousins = first != second && grandfatherFirst != UNKNOWN
                       && grandfatherFirst == grandfatherOf(second);
        cout << (cousins ? "YES\n" : "NO\n");
    }
}
