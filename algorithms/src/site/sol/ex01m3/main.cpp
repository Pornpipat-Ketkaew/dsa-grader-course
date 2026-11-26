#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, asked;
    cin >> n >> asked;
    vector<int> mealTime(n);
    // chef = 0..n-1
    for (int chef = 0; chef < n; chef++) cin >> mealTime[chef];
    int fastest = *min_element(mealTime.begin(), mealTime.end());

    // seatedBy(t) = customers seated at time <= t. Chef i seats someone at
    // 0, T, 2T, ..., so t / T + 1 customers. It never decreases as t grows,
    // which is exactly what binary search on the answer needs.
    auto seatedBy = [&](long long t) {
        long long seated = 0;
        // chef = 0..n-1: add up every seat
        for (int chef = 0; chef < n; chef++) seated += t / mealTime[chef] + 1;
        return seated;
    };

    // question = 0..asked-1: each customer label is answered on its own
    for (int question = 0; question < asked; question++) {
        long long customer;
        cin >> customer;
        // Smallest t with seatedBy(t) >= customer.
        // Invariant: seatedBy(low) < customer (low = -1 means "before opening"),
        // seatedBy(high) >= customer: the fastest chef alone seats customer people
        // by time (customer - 1) * fastest, so that is a safe high.
        long long low = -1, high = (customer - 1) * fastest;
        // halve (low, high] until they are neighbours
        while (high - low > 1) {
            long long middle = low + (high - low) / 2;
            if (seatedBy(middle) >= customer) high = middle;
            else low = middle;
        }
        cout << high << '\n';
    }
}
