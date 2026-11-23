#include <iostream>
#include <string>
using namespace std;

int N;
int left_[4];                // how many more A, B, C, D we may still use
string cur, out;             // out collects every answer line, so the count can be printed first
long long P = 0;

// fill positions pos, pos+1, ..., N-1
void gen(int pos) {
    if (pos == N) { out += cur; out += '\n'; P++; return; }
    // letters in alphabetical order: A, B, C, D -> answers come out in dictionary order
    for (int c = 0; c < 4; c++) {
        if (left_[c] == 0) continue;          // this letter is used up
        left_[c]--;
        cur[pos] = 'A' + c;
        gen(pos + 1);
        left_[c]++;                           // undo
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin >> N >> left_[0] >> left_[1] >> left_[2] >> left_[3];
    cur.assign(N, ' ');
    gen(0);
    cout << P << "\n" << out;
}
