#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int f, w, n;
    cin >> f >> w >> n;
    vector<int> food(f);
    // read the f cells that hold food
    for (int i = 0; i < f; i++) cin >> food[i];
    sort(food.begin(), food.end());           // left to right

    int lamps = 0;
    long long litUpTo = 0;                    // every cell <= litUpTo is already lit (0 = nothing yet)
    // greedy: the leftmost dark food cell forces a lamp; put it as far right as possible
    for (int i = 0; i < f; i++) {
        if (food[i] > litUpTo) {              // this food is still dark
            lamps++;
            long long x = (long long)food[i] + w;   // lamp at food + w still reaches this food
            litUpTo = x + w;                  // and lights everything up to x + w
        }
    }
    cout << lamps << "\n";
}
