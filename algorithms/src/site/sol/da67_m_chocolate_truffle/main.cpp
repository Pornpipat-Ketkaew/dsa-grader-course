#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    long long rows, cols;
    int k;
    cin >> rows >> cols >> k;
    // Eating order is reading order, so cell (p, q) is eaten on step
    // (p - 1) * cols + (q - 1) of one round of rows * cols steps (up to 10^18: long long).
    vector<long long> favourite(k);
    // index = 0..k-1
    for (int index = 0; index < k; index++) {
        long long row, col;
        cin >> row >> col;
        favourite[index] = (row - 1) * cols + (col - 1);
    }
    sort(favourite.begin(), favourite.end());
    long long cells = rows * cols;

    int q;
    cin >> q;
    string output;
    // query = 0..q-1
    for (int query = 0; query < q; query++) {
        long long row, col;
        cin >> row >> col;
        long long position = (row - 1) * cols + (col - 1);
        // the next favourite at or after this position, in this round...
        auto next = lower_bound(favourite.begin(), favourite.end(), position);
        long long days;
        if (next != favourite.end()) days = *next - position;
        else days = favourite[0] + cells - position;     // ...or the first one of the next round
        output += to_string(days);
        output += '\n';
    }
    cout << output;
}
