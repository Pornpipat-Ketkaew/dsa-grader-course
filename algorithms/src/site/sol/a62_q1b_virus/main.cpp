#include <iostream>
#include <vector>
using namespace std;

vector<int> code;   // the genetic code being checked

bool isReversedVirus(int left, int right);

// Is code[left .. right-1] a virus?
//   length 2: it must be exactly 0 1
//   longer  : code = a + b (two halves); b must be a virus,
//             and a must be a virus or a reversed virus (the mutation)
bool isVirus(int left, int right) {
    if (right - left == 2) return code[left] == 0 && code[left + 1] == 1;
    int middle = (left + right) / 2;
    return isVirus(middle, right) &&
           (isVirus(left, middle) || isReversedVirus(left, middle));
}

// Is code[left .. right-1] a virus read backwards?
// reverse(a + b) = reverse(b) + reverse(a), so
//   first half  = reverse(b): must be a reversed virus,
//   second half = reverse(a) where a may itself be mutated: a virus or a reversed virus
bool isReversedVirus(int left, int right) {
    if (right - left == 2) return code[left] == 1 && code[left + 1] == 0;
    int middle = (left + right) / 2;
    return isReversedVirus(left, middle) &&
           (isVirus(middle, right) || isReversedVirus(middle, right));
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
        cout << (isVirus(0, length) ? "yes" : "no") << '\n';
    }
}
