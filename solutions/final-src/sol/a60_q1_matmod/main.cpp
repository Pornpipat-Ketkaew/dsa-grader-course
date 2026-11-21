#include <iostream>
#include <vector>
using namespace std;

// A 2x2 matrix is stored as {a, b, c, d}  =  [ a b ]
//                                             [ c d ]
typedef vector<long long> Mat;

// (M * N) mod k. Every entry of M and N is already < k <= 10,000,
// so each product is < 10^8 and a sum of two products fits easily in long long.
Mat matrix_multiply(const Mat &M, const Mat &N, int k) {
    return {
        (M[0] * N[0] + M[1] * N[2]) % k,  (M[0] * N[1] + M[1] * N[3]) % k,
        (M[2] * N[0] + M[3] * N[2]) % k,  (M[2] * N[1] + M[3] * N[3]) % k
    };
}

// A^n mod k by divide and conquer:
//   A^n = (A^(n/2))^2        if n is even
//   A^n = (A^(n/2))^2 * A    if n is odd
// Each call halves n, so there are only about log2(n) <= 30 levels.
Mat power(const Mat &A, long long n, int k) {
    if (n == 1) return A;
    Mat half = power(A, n / 2, k);
    Mat result = matrix_multiply(half, half, k);
    if (n % 2 == 1) result = matrix_multiply(result, A, k);
    return result;
}

int main() {
    long long n;
    int k;
    cin >> n >> k;
    Mat A(4);
    // read a, b, c, d and reduce them mod k right away
    for (int i = 0; i < 4; i++) {
        cin >> A[i];
        A[i] %= k;
    }
    Mat R = power(A, n, k);
    cout << R[0] << ' ' << R[1] << ' ' << R[2] << ' ' << R[3] << '\n';
}
