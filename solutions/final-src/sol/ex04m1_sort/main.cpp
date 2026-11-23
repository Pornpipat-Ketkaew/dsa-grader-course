#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int n;
    cin >> n;
    vector<int> a(n);
    int cnt[4] = {0, 0, 0, 0};
    // read the array and count how many 1s, 2s and 3s there are
    for (int i = 0; i < n; i++) { cin >> a[i]; cnt[a[i]]++; }

    // zone of value v in the sorted array: the 1-zone, then the 2-zone, then the 3-zone
    // c[z][v] = how many v's are sitting in the zone that belongs to z
    long long c[4][4] = {};
    int zoneEnd1 = cnt[1], zoneEnd2 = cnt[1] + cnt[2];
    // classify every position by its zone and the value it holds
    for (int i = 0; i < n; i++) {
        int z = (i < zoneEnd1) ? 1 : (i < zoneEnd2 ? 2 : 3);
        c[z][a[i]]++;
    }
    // 1. pairs that are each other's fix: one swap repairs two positions
    long long two = min(c[1][2], c[2][1]) + min(c[1][3], c[3][1]) + min(c[2][3], c[3][2]);
    // 2. what is left forms 3-cycles (1->2->3->1 or 1->3->2->1): two swaps repair three positions
    long long left = c[1][2] + c[2][1] + c[1][3] + c[3][1] + c[2][3] + c[3][2] - 2 * two;
    cout << two + left / 3 * 2 << "\n";
}
