#include <iostream>
#include <vector>
using namespace std;

const int INVALID = -1;
vector<int> code;   // the genetic code being checked

// Check code[left .. right-1]. Return its number of 1s if it is a valid virus,
// INVALID otherwise. Returning the count lets the parent compare the halves for free.
int onesIfVirus(int left, int right) {
    if (right - left == 2) return code[left] + code[left + 1];    // every 2-digit code is valid
    int middle = (left + right) / 2;
    int leftOnes = onesIfVirus(left, middle);
    if (leftOnes == INVALID) return INVALID;
    int rightOnes = onesIfVirus(middle, right);
    if (rightOnes == INVALID) return INVALID;
    if (leftOnes - rightOnes > 1 || rightOnes - leftOnes > 1) return INVALID;   // joining rule
    return leftOnes + rightOnes;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    int testCount, k;
    cin >> testCount >> k;
    int length = 1 << k;
    code.resize(length);
    // test = 0..testCount-1: check the codes one by one
    for (int test = 0; test < testCount; test++) {
        // index = 0..length-1: read the 2^k digits
        for (int index = 0; index < length; index++) cin >> code[index];
        cout << (onesIfVirus(0, length) != INVALID ? "yes" : "no") << '\n';
    }
}
