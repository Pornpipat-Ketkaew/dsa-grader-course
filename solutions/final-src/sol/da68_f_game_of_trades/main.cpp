#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios_base::sync_with_stdio(0); cin.tie(NULL);
    int N, M;
    long long K;
    cin >> N >> M >> K;
    vector<vector<int>> X(N, vector<int>(M)), Y(N, vector<int>(M)), Z(N, vector<int>(M));
    // X = price NPC i sells item j to us, Y = price NPC i buys item j from us, Z = stock
    for (int i = 0; i < N; i++) for (int j = 0; j < M; j++) cin >> X[i][j];
    for (int i = 0; i < N; i++) for (int j = 0; j < M; j++) cin >> Y[i][j];
    for (int i = 0; i < N; i++) for (int j = 0; j < M; j++) cin >> Z[i][j];

    // units[p] = how many units we can buy that earn a profit of exactly p each (p = 1..999)
    vector<long long> units(1000, 0);
    // item by item
    for (int j = 0; j < M; j++) {
        // the best and second best buyer of item j (we may not sell back to the seller)
        int best1 = 0, who1 = -1, best2 = 0;
        for (int i = 0; i < N; i++) {
            if (Y[i][j] > best1) { best2 = best1; best1 = Y[i][j]; who1 = i; }
            else if (Y[i][j] > best2) best2 = Y[i][j];
        }
        // every seller i of item j: sell its units to the best buyer that is not i
        for (int i = 0; i < N; i++) {
            int sellTo = (i == who1) ? best2 : best1;
            int p = sellTo - X[i][j];
            if (p > 0) units[p] += Z[i][j];   // only trades that make money
        }
    }
    // greedy: K units at most, take the most profitable units first
    long long profit = 0;
    for (int p = 999; p >= 1 && K > 0; p--) {
        long long take = min(K, units[p]);
        profit += take * p;
        K -= take;
    }
    cout << profit << "\n";
}
