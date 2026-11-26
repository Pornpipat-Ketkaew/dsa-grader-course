#include <iostream>
#include <string>
#include <vector>
#include <cmath>
#include <cctype>
using namespace std;

// Up to 20 tables of 500 x 500 rates = 5 000 000 decimals. "cin >> double"
// alone needs about 0.8 s for that, so read whole lines and convert the
// plain decimals ("1", "0.7179") digit by digit.
string line;
size_t linePos = 0;

double readRate() {
    // skip spaces; fetch the next line when this one is used up
    while (true) {
        while (linePos < line.size() && !isdigit((unsigned char)line[linePos]) && line[linePos] != '.') linePos++;
        if (linePos < line.size()) break;
        getline(cin, line);
        linePos = 0;
    }
    double value = 0;
    // integer part, left to right
    while (linePos < line.size() && isdigit((unsigned char)line[linePos])) value = value * 10 + (line[linePos++] - '0');
    if (linePos < line.size() && line[linePos] == '.') {
        linePos++;
        double place = 0.1;
        // fraction digits, each one worth a tenth of the previous
        while (linePos < line.size() && isdigit((unsigned char)line[linePos])) {
            value += (line[linePos++] - '0') * place;
            place /= 10;
        }
    }
    return value;
}

// Does following lastImprovedFrom[] from some currency loop back on itself?
// A loop there can only come from a negative cycle (see the page).
bool parentPointersLoop(const vector<int>& lastImprovedFrom) {
    int n = lastImprovedFrom.size();
    vector<int> walkId(n, -1);            // which walk first visited each currency
    // start = 0..n-1: walk the pointers from every currency not walked yet
    for (int start = 0; start < n; start++) {
        int currency = start;
        // follow pointers until a dead end (-1) or a currency seen before
        while (currency != -1 && walkId[currency] == -1) {
            walkId[currency] = start;
            currency = lastImprovedFrom[currency];
        }
        if (currency != -1 && walkId[currency] == start) return true;   // came back into this walk
    }
    return false;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int tables = readRate();
    // table = 0..K-1: each table is independent
    for (int table = 0; table < tables; table++) {
        int n = readRate();
        // Money MULTIPLIES along a route, so use weight = -log(rate):
        //   product of rates > 1  <=>  sum of log(rate) > 0  <=>  sum of weights < 0.
        // Infinite money is exactly a NEGATIVE CYCLE.
        vector<vector<double>> weight(n, vector<double>(n));
        // from = 0..n-1, to = 0..n-1: read the table row by row
        for (int from = 0; from < n; from++)
            for (int to = 0; to < n; to++) {
                double rate = readRate();
                weight[from][to] = rate > 0 ? -log(rate) : INFINITY;   // rate 0 = no exchange
            }

        // Bellman-Ford from a hidden source joined to every currency by 0.
        const double EPS = 1e-12;            // ignore changes that are only rounding noise
        vector<double> potential(n, 0.0);
        vector<int> lastImprovedFrom(n, -1);
        bool infiniteMoney = false;
        // round = 1..n: stop when a round changes nothing (no negative cycle)
        // or when the improvement pointers already close a loop
        for (int round = 1; round <= n; round++) {
            bool changed = false;
            // every ordered pair (from, to) is an edge
            for (int from = 0; from < n; from++)
                for (int to = 0; to < n; to++)
                    if (potential[from] + weight[from][to] < potential[to] - EPS) {
                        potential[to] = potential[from] + weight[from][to];
                        lastImprovedFrom[to] = from;
                        changed = true;
                    }
            if (!changed) break;
            if (round == n || parentPointersLoop(lastImprovedFrom)) {
                infiniteMoney = true;
                break;
            }
        }
        cout << (infiniteMoney ? "YES" : "NO") << '\n';
    }
}
