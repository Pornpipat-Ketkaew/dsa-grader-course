#include <iostream>
using namespace std;

const long long MOD = 100000007;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    // A column is 00, 10 (top 1) or 01 (bottom 1); 11 would put two 1s next to each other.
    // Count the valid tables of the current length by the state of their LAST column.
    long long endsEmpty = 1, endsTop = 1, endsBottom = 1;          // length 1
    // column = 2..n (left to right): append one column to every table of length column-1
    for (int column = 2; column <= n; column++) {
        long long nextEmpty = (endsEmpty + endsTop + endsBottom) % MOD;   // 00 fits after anything
        long long nextTop = (endsEmpty + endsBottom) % MOD;               // not after a top 1
        long long nextBottom = (endsEmpty + endsTop) % MOD;               // not after a bottom 1
        endsEmpty = nextEmpty;
        endsTop = nextTop;
        endsBottom = nextBottom;
    }
    cout << (endsEmpty + endsTop + endsBottom) % MOD << '\n';
}
