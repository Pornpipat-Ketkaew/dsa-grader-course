#include <iostream>
#include <vector>
using namespace std;

const long long IMPOSSIBLE = -1;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    int itemCount, target;
    cin >> itemCount >> target;
    // cheapest[weight] = lowest total price of items whose weights add up to exactly weight
    vector<long long> cheapest(target + 1, IMPOSSIBLE);
    cheapest[0] = 0;                               // the empty group
    // item = 0..itemCount-1: add the items one at a time
    for (int item = 0; item < itemCount; item++) {
        int weight;
        long long price;
        cin >> weight >> price;
        // total = target down to weight (big to small, int because it counts down):
        // cheapest[total - weight] still excludes this item, so it is used at most once
        for (int total = target; total >= weight; total--) {
            long long without = cheapest[total - weight];
            if (without != IMPOSSIBLE && (cheapest[total] == IMPOSSIBLE || without + price < cheapest[total]))
                cheapest[total] = without + price;
        }
    }
    cout << cheapest[target] << '\n';            // IMPOSSIBLE prints -1
}
