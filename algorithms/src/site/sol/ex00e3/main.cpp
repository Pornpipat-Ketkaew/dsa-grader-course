#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;

    // seen[value] becomes true the first time `value` is read (values 1..n; index 0 unused)
    vector<bool> seen(n + 1);
    bool isPermutation = true;

    // index = 1, 2, ..., n (left to right): read f(index) and test it immediately.
    // Breaking early is safe because nothing else has to be read afterwards.
    for (int index = 1; index <= n; index++) {
        long long value;                          // |value| can be 2e9: long long is safe
        cin >> value;
        if (value < 1 || value > n || seen[value]) {   // outside 1..n, or a repeat
            isPermutation = false;
            break;
        }
        seen[value] = true;
    }

    // n values, all inside 1..n, none repeated  =>  every value of 1..n is hit (pigeonhole)
    cout << (isPermutation ? "YES" : "NO") << '\n';
}
