#include <iostream>
#include <vector>
using namespace std;

int main() {
    int N, K, S;
    cin >> N >> K >> S;
    int ones = 0;
    // read the binary array; only the number of 1s matters (each 0 adds nothing)
    for (int i = 0; i < N; i++) {
        int x;
        cin >> x;
        ones += x;
    }
    // ways[s] = number of ways to fill the 1s handled so far so that they add up to s
    vector<long long> ways(S + 1, 0);
    ways[0] = 1;
    // fill the 1s one at a time
    for (int i = 0; i < ones; i++) {
        vector<long long> nw(S + 1, 0);
        // every sum reached so far
        for (int s = 0; s <= S; s++) {
            if (ways[s] == 0) continue;
            // the new 1 becomes v = 1 .. K
            for (int v = 1; v <= K && s + v <= S; v++) nw[s + v] += ways[s];
        }
        ways = nw;
    }
    cout << ways[S] << "\n";
}
