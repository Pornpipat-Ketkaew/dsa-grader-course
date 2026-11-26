#include <iostream>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    long long fib[46];                    // fib[i] = F(i); F(45) = 1 134 903 170 fits easily
    fib[0] = 0;
    fib[1] = 1;
    // index = 2..n (small to large): each value needs the two smaller ones, already filled
    for (int index = 2; index <= n; index++) fib[index] = fib[index - 1] + fib[index - 2];
    cout << fib[n] << '\n';
}
