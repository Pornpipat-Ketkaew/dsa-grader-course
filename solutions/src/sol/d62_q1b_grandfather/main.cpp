#include <iostream>
#include <unordered_map>
using namespace std;

unordered_map<long long, long long> father;   // father[s] = f  (ids up to 13 digits -> long long)

// Return the grandfather of x, or -1 if x has no known father or the father has no known father.
long long grandfather(long long x) {
    auto it = father.find(x);                  // find(), NOT father[x]: [] would insert x with 0
    if (it == father.end()) return -1;         // x's father unknown
    auto it2 = father.find(it->second);        // look up the father's father
    if (it2 == father.end()) return -1;        // grandfather unknown
    return it2->second;
}

int main() {
    ios_base::sync_with_stdio(false); cin.tie(0);

    int n, m;
    cin >> n >> m;
    father.reserve(2 * n);                     // avoid rehashing 1e6 inserts

    // r visits 0, 1, ..., n-1: read each "F is the father of S" line.
    for (int r = 0; r < n; r++) {
        long long f, s;
        cin >> f >> s;
        father[s] = f;
    }

    // q visits 0, 1, ..., m-1: answer queries in input order.
    for (int q = 0; q < m; q++) {
        long long a, b;
        cin >> a >> b;
        long long ga = grandfather(a);
        long long gb = grandfather(b);
        // YES only if: different people, both grandfathers known, and they are the same person
        if (a != b && ga != -1 && ga == gb) cout << "YES\n";
        else                                cout << "NO\n";
    }
}
