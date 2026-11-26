#include <iostream>
using namespace std;

// a 2x2 matrix [ a b ]
//              [ c d ], every entry already reduced mod k
struct Matrix {
    long long a, b, c, d;
};

int k;

// (X * Y) mod k: each entry is < k <= 10 000, so a product is < 10^8 and fits easily
Matrix multiply(const Matrix &X, const Matrix &Y) {
    return { (X.a * Y.a + X.b * Y.c) % k, (X.a * Y.b + X.b * Y.d) % k,
             (X.c * Y.a + X.d * Y.c) % k, (X.c * Y.b + X.d * Y.d) % k };
}

// A^exponent mod k by divide and conquer (exponent >= 1):
//   A^e = (A^(e/2))^2       when e is even
//   A^e = (A^(e/2))^2 * A   when e is odd
Matrix power(const Matrix &A, long long exponent) {
    if (exponent == 1) return A;
    Matrix half = power(A, exponent / 2);               // solve the half problem once
    Matrix result = multiply(half, half);               // ... and reuse it twice
    if (exponent % 2 == 1) result = multiply(result, A);
    return result;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    long long n;
    Matrix A;
    cin >> n >> k >> A.a >> A.b >> A.c >> A.d;
    A = { A.a % k, A.b % k, A.c % k, A.d % k };         // reduce first: n = 1 must print A mod k
    Matrix result = power(A, n);
    cout << result.a << ' ' << result.b << ' ' << result.c << ' ' << result.d << '\n';
}
