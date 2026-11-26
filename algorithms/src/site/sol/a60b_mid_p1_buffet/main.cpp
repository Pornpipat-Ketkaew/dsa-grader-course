#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    int foodCount, reach, tableLength;
    cin >> foodCount >> reach >> tableLength;
    vector<int> food(foodCount);
    // index = 0..foodCount-1: the cells that hold food (any order)
    for (int index = 0; index < foodCount; index++) cin >> food[index];
    sort(food.begin(), food.end());               // left to right

    int lamps = 0;
    int litUpTo = 0;                              // every cell <= litUpTo is lit (0 = nothing yet)
    // index = 0..foodCount-1 (left to right): the leftmost dark food forces a lamp,
    // and the lamp goes as far right as possible while still reaching it
    for (int index = 0; index < foodCount; index++) {
        if (food[index] > litUpTo) {
            lamps++;
            int lampAt = food[index] + reach;     // farthest position that still lights this food
            litUpTo = lampAt + reach;
        }
    }
    cout << lamps << '\n';
}
