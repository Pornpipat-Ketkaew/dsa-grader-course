#include <iostream>
using namespace std;

long long memo[46];     // memo[i] = F(i) once computed, -1 = not computed yet

// Top-down: the plain recursive definition, plus a memo table so that
// every F(i) is computed only ONCE (without it, F(45) needs ~3.7 billion calls).
long long fib(int i) {
    if (i <= 1) return i;              // F(0) = 0, F(1) = 1
    if (memo[i] != -1) return memo[i];
    return memo[i] = fib(i - 1) + fib(i - 2);
}

int main() {
    int n;
    cin >> n;
    // mark F(0) .. F(45) as "not computed"
    for (int i = 0; i <= 45; i++) memo[i] = -1;
    cout << fib(n) << "\n";
}
