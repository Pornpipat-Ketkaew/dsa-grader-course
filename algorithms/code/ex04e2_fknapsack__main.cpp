#include <iostream>
#include <iomanip>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    double capacity;
    int n;
    cin >> capacity >> n;
    vector<double> price(n), weight(n);
    // item = 0..n-1: the n prices, then the n weights
    for (int item = 0; item < n; item++) cin >> price[item];
    for (int item = 0; item < n; item++) cin >> weight[item];

    vector<int> order(n);
    // position = 0..n-1: start with items 0, 1, ..., n-1, then sort by price per unit weight
    for (int position = 0; position < n; position++) order[position] = position;
    sort(order.begin(), order.end(), [&](int a, int b) {
        return price[a] * weight[b] > price[b] * weight[a];   // price/weight larger first, no division
    });

    double total = 0, room = capacity;
    // position = 0..n-1 (best ratio first) while the bag still has room
    for (int position = 0; position < n && room > 0; position++) {
        int item = order[position];
        if (weight[item] <= room) {          // the whole item fits
            total += price[item];
            room -= weight[item];
        } else {                             // take the fraction that fills the bag exactly
            total += price[item] * (room / weight[item]);
            room = 0;
        }
    }
    cout << fixed << setprecision(4) << total << '\n';
}
