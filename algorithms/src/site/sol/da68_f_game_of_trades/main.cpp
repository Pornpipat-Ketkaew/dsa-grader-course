#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    int npcCount, itemCount;
    long long limit;
    cin >> npcCount >> itemCount >> limit;
    // sellPrice = X (NPC sells to us), buyPrice = Y (NPC buys from us), stock = Z
    vector<vector<int>> sellPrice(npcCount, vector<int>(itemCount));
    vector<vector<int>> buyPrice(npcCount, vector<int>(itemCount));
    vector<vector<int>> stock(npcCount, vector<int>(itemCount));
    // npc = 0..npcCount-1, item = 0..itemCount-1: the three N x M tables, row by row
    for (int npc = 0; npc < npcCount; npc++)
        for (int item = 0; item < itemCount; item++) cin >> sellPrice[npc][item];
    for (int npc = 0; npc < npcCount; npc++)
        for (int item = 0; item < itemCount; item++) cin >> buyPrice[npc][item];
    for (int npc = 0; npc < npcCount; npc++)
        for (int item = 0; item < itemCount; item++) cin >> stock[npc][item];

    // unitsWithProfit[profit] = units we can buy that earn exactly `profit` each (1..999)
    vector<long long> unitsWithProfit(1000, 0);
    // item = 0..itemCount-1: handle every item on its own
    for (int item = 0; item < itemCount; item++) {
        // npc = 0..npcCount-1: find the best and second-best buyer of this item
        int bestPrice = 0, bestBuyer = -1, secondPrice = 0;
        for (int npc = 0; npc < npcCount; npc++) {
            int price = buyPrice[npc][item];
            if (price > bestPrice) { secondPrice = bestPrice; bestPrice = price; bestBuyer = npc; }
            else if (price > secondPrice) secondPrice = price;
        }
        // npc = 0..npcCount-1 as seller: sell to the best buyer that is not the seller itself
        for (int npc = 0; npc < npcCount; npc++) {
            int sellTo = (npc == bestBuyer) ? secondPrice : bestPrice;
            int profit = sellTo - sellPrice[npc][item];
            if (profit > 0) unitsWithProfit[profit] += stock[npc][item];
        }
    }
    // profit = 999 down to 1: greedily take the most profitable units first, at most `limit`
    long long total = 0;
    for (int profit = 999; profit >= 1 && limit > 0; profit--) {
        long long take = min(limit, unitsWithProfit[profit]);
        total += take * profit;
        limit -= take;
    }
    cout << total << '\n';
}
