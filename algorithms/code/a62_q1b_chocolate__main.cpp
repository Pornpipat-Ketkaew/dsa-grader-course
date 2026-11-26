#include <iostream>
#include <vector>
using namespace std;

const int MOD = 1000003;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    int pieces, sizeCount;
    cin >> pieces >> sizeCount;
    vector<int> allowed(sizeCount);
    // index = 0..sizeCount-1: the allowed numbers of pieces per day
    for (int index = 0; index < sizeCount; index++) cin >> allowed[index];

    // ways[length] = number of ways to eat a bar of exactly `length` pieces.
    // The last day eats some allowed s, leaving a bar of length - s:
    //     ways[length] = sum of ways[length - s] over allowed s <= length
    vector<int> ways(pieces + 1, 0);
    ways[0] = 1;                                     // an empty bar: one way (nothing left to eat)
    // length = 1..pieces (increasing): every ways[length - s] is already final
    for (int length = 1; length <= pieces; length++) {
        // index = 0..sizeCount-1: try each allowed size as the last day
        for (int index = 0; index < sizeCount; index++)
            if (allowed[index] <= length)
                ways[length] = (ways[length] + ways[length - allowed[index]]) % MOD;
    }
    cout << ways[pieces] << '\n';
}
