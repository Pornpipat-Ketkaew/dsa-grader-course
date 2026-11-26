#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    vector<int> values(n);
    int countOf[4] = {};                       // countOf[v] = how many times v (1..3) appears

    // index = 0, 1, ..., n-1: read the array and count each value
    for (int index = 0; index < n; index++) {
        cin >> values[index];
        countOf[values[index]]++;
    }

    // In the sorted array, value 1 occupies [0, endOfOnes), 2 occupies [endOfOnes, endOfTwos),
    // 3 occupies [endOfTwos, n). Call these the zones of 1, 2 and 3.
    int endOfOnes = countOf[1];
    int endOfTwos = countOf[1] + countOf[2];

    // misplaced[zone][value] = how many `value`s sit inside the zone that belongs to `zone`
    long long misplaced[4][4] = {};
    // index = 0, 1, ..., n-1: classify every position by (its zone, the value it holds)
    for (int index = 0; index < n; index++) {
        int zone = index < endOfOnes ? 1 : (index < endOfTwos ? 2 : 3);
        misplaced[zone][values[index]]++;
    }

    // 2-cycles: a 2 in the 1-zone and a 1 in the 2-zone fix each other with ONE swap
    long long pairSwaps = min(misplaced[1][2], misplaced[2][1])
                        + min(misplaced[1][3], misplaced[3][1])
                        + min(misplaced[2][3], misplaced[3][2]);

    long long wrongTotal = misplaced[1][2] + misplaced[2][1] + misplaced[1][3]
                         + misplaced[3][1] + misplaced[2][3] + misplaced[3][2];

    // everything left forms 3-cycles (1->2->3->1 or reverse): TWO swaps fix three elements
    long long leftInCycles = wrongTotal - 2 * pairSwaps;
    cout << pairSwaps + leftInCycles / 3 * 2 << '\n';
}
