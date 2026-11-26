#include <iostream>
#include <vector>
#include <cstdlib>
using namespace std;

int monsterCount, towerCount, reach;
vector<int> monsterAt, power, towerAt;   // power[j] = power monster j still has
int bestHits;                            // most useful hits found so far (global: starts at 0)

// Decide the target of towers tower, tower+1, ..., towerCount-1.
// hits = useful hits made by towers 0..tower-1 (a hit is useful if the monster still has power).
void shoot(int tower, int hits) {
    // bound: even if every remaining tower makes a useful hit we cannot beat bestHits
    if (hits + (towerCount - tower) <= bestHits) return;
    if (tower == towerCount) { bestHits = hits; return; }
    // monster = 0..monsterCount-1: tower shoots a monster in range that still has power
    for (int monster = 0; monster < monsterCount; monster++) {
        if (power[monster] > 0 && abs(monsterAt[monster] - towerAt[tower]) <= reach) {
            power[monster]--;                 // choose
            shoot(tower + 1, hits + 1);       // explore
            power[monster]++;                 // un-choose
        }
    }
    // last option: this tower makes no useful hit (nothing in range, or everything is at 0)
    shoot(tower + 1, hits);
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    int roadLength;
    cin >> roadLength >> monsterCount >> towerCount >> reach;
    monsterAt.resize(monsterCount);
    power.resize(monsterCount);
    towerAt.resize(towerCount);
    long long totalPower = 0;
    for (int monster = 0; monster < monsterCount; monster++) cin >> monsterAt[monster];
    for (int monster = 0; monster < monsterCount; monster++) {
        cin >> power[monster];
        totalPower += power[monster];
    }
    for (int tower = 0; tower < towerCount; tower++) cin >> towerAt[tower];
    shoot(0, 0);
    cout << totalPower - bestHits << '\n';
}
